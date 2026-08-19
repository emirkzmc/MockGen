"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetSchema } from "@/hooks/schemas/useSchema";
import { useCreateSchemaMutation, useUpdateSchemaMutation } from "@/hooks/schemas/useSchemaMutations";
import { Save, Plus, Trash2, ArrowLeft, Settings, ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import Link from "next/link";
import toast from "react-hot-toast";
import { PanelInput } from "@/components/ui/PanelInput";
import { PanelSelect } from "@/components/ui/PanelSelect";
import { PanelButton } from "@/components/ui/PanelButton";
import { PanelIconButton } from "@/components/ui/PanelIconButton";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import { SchemaField } from "@/domain/schemaDomains";
import { FieldRow, DraggableFieldRow } from "@/components/schemas/FieldRow";
import { Reorder } from "framer-motion";


function SchemaEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [name, setName] = useState("User Model");
  const [fields, setFields] = useState<SchemaField[]>([
    { id: "1", name: "id", type: "uuid" },
    { id: "2", name: "name", type: "string" },
  ]);

  const { data: existingSchema, isLoading } = useGetSchema(editId);
  const createMutation = useCreateSchemaMutation();
  const updateMutation = useUpdateSchemaMutation();

  useEffect(() => {
    if (existingSchema) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(existingSchema.name);
      
      const parseSchemaFields = (schemaObj: Record<string, unknown>): SchemaField[] => {
        const keys = Array.isArray(schemaObj._meta_order)
          ? (schemaObj._meta_order as string[])
          : Object.keys(schemaObj).filter(k => k !== '_meta_order');
        
        return keys.map((fieldName, index) => {
          const typeDef = schemaObj[fieldName];
          if (typeof typeDef === 'object' && typeDef !== null && (typeDef as Record<string, unknown>).type === 'array') {
            return {
              id: Date.now().toString() + index,
              name: fieldName,
              type: 'array' as SchemaField["type"],
              subFields: parseSchemaFields(((typeDef as Record<string, unknown>).itemType as Record<string, unknown>) || {}),
            };
          }
          return {
            id: Date.now().toString() + index,
            name: fieldName,
            type: typeDef as SchemaField["type"],
          };
        });
      };
      
      const parsedFields = parseSchemaFields(existingSchema.schema);
      if (parsedFields.length > 0) {
        setFields(parsedFields);
      }
    }
  }, [existingSchema]);

  const addField = () => {
    setFields([...fields, { id: Date.now().toString(), name: "new_field", type: "string" }]);
  };

  const updateField = (id: string, key: keyof SchemaField, value: string | SchemaField[]) => {
    const updateRecursive = (fieldsList: SchemaField[]): SchemaField[] => {
      return fieldsList.map((f) => {
        if (f.id === id) {
          return { ...f, [key]: value };
        }
        if (f.subFields) {
          return { ...f, subFields: updateRecursive(f.subFields) };
        }
        return f;
      });
    };
    setFields(updateRecursive(fields));
  };
  
  const addSubField = (parentId: string) => {
    const addRecursive = (fieldsList: SchemaField[]): SchemaField[] => {
      return fieldsList.map(f => {
        if (f.id === parentId) {
          return {
            ...f,
            subFields: [...(f.subFields || []), { id: Date.now().toString(), name: "new_sub_field", type: "string" }]
          };
        }
        if (f.subFields) {
          return { ...f, subFields: addRecursive(f.subFields) };
        }
        return f;
      });
    };
    setFields(addRecursive(fields));
  };
  
  const removeField = (id: string) => {
    const removeRecursive = (fieldsList: SchemaField[]): SchemaField[] => {
      return fieldsList.filter(f => f.id !== id).map(f => {
        if (f.subFields) return { ...f, subFields: removeRecursive(f.subFields) };
        return f;
      });
    };
    setFields(removeRecursive(fields));
  };

  const reorderSubField = (parentId: string, newSubFields: SchemaField[]) => {
    const reorderRecursive = (fieldsList: SchemaField[]): SchemaField[] => {
      return fieldsList.map(f => {
        if (f.id === parentId) {
          return { ...f, subFields: newSubFields };
        }
        if (f.subFields) {
          return { ...f, subFields: reorderRecursive(f.subFields) };
        }
        return f;
      });
    };
    setFields(reorderRecursive(fields));
  };

  const debouncedFields = useDebounce(fields, 500);

  const { data: previewData, isFetching: isPreviewFetching } = useQuery({
    queryKey: ['preview', debouncedFields],
    queryFn: async () => {
      if (debouncedFields.length === 0) return {};
      const { data } = await axios.post('/api/preview', {
        fields: debouncedFields,
        count: 1, // Sadece 1 adet önizleme
      });
      return data;
    },
  });

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Schema Name cannot be empty");
      return;
    }

    const buildSchema = (fieldsList: SchemaField[]): Record<string, unknown> => {
      const sch: Record<string, unknown> = {};
      const order: string[] = [];
      fieldsList.forEach((f) => {
        if (f.name.trim()) {
          order.push(f.name.trim());
          if (f.type === 'array') {
            sch[f.name.trim()] = { type: 'array', itemType: buildSchema(f.subFields || []) };
          } else {
            sch[f.name.trim()] = f.type;
          }
        }
      });
      if (order.length > 0) {
        sch._meta_order = order;
      }
      return sch;
    };
    
    const schema = buildSchema(fields);

    const payload = {
      name,
      schema,
    };

    if (editId) {
      updateMutation.mutate(
        { id: editId, payload },
        {
          onSuccess: () => {
            router.push("/schemas");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          router.push("/schemas");
        },
      });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-black/50 dark:text-white/50">
        <Spinner size="lg" className="mb-4" />
        <p className="font-light tracking-wide">Loading Editor...</p>
      </div>
    );
  }

  return (
    <section className="space-y-12 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 border-b border-black/10 dark:border-white/10 pb-8">
        <div className="flex items-center space-x-6">
          <Link href="/schemas" className="text-black/60 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-light text-black dark:text-white tracking-wide">{editId ? "Edit Schema" : "New Schema"}</h1>
            <p className="text-sm text-black/60 dark:text-white/40 mt-2 font-light">Define your data models here.</p>
          </div>
        </div>
        <PanelButton
          onClick={handleSave}
          disabled={isSaving}
          icon={isSaving ? <Spinner size="sm" /> : <Save className="w-4 h-4" />}
        >
          {isSaving ? "Saving..." : "Save Schema"}
        </PanelButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 flex flex-col space-y-12">
          
          <div className="space-y-8">
            <h2 className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest border-b border-black/10 dark:border-white/5 pb-4">Configuration</h2>
            <div>
              <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Schema Name</label>
              <PanelInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="User Model"
                className="font-mono max-w-sm"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-black/10 dark:border-white/5 pb-4">
              <h2 className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest">Model Schema</h2>
              <button
                onClick={addField}
                className="cursor-pointer text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white uppercase tracking-widest flex items-center space-x-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Field</span>
              </button>
            </div>
            
            <Reorder.Group axis="y" values={fields} onReorder={setFields} className="space-y-4">
              {fields.map((field) => (
                <DraggableFieldRow key={field.id} field={field} updateField={updateField} removeField={removeField} addSubField={addSubField} reorderSubField={reorderSubField} />
              ))}
            </Reorder.Group>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-12 space-y-6">
            <div className="flex justify-between items-center border-b border-black/10 dark:border-white/5 pb-4">
              <h2 className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#810100] animate-pulse"></span>
                <span>Live Preview</span>
              </h2>
            </div>
            
            <div className="bg-black/5 dark:bg-white/2 border border-black/10 dark:border-white/5 rounded-xl p-6 font-mono text-sm text-black/80 dark:text-white/70 min-h-100 overflow-auto relative">
              {isPreviewFetching && (
                <div className="absolute top-2 right-4 text-xs flex items-center space-x-2 text-black/40 dark:text-white/30">
                  <Spinner className="w-5 h-5 text-white/50" />
                  <span>Updating...</span>
                </div>
              )}
              <pre className="whitespace-pre-wrap break-all opacity-80">
                {JSON.stringify(previewData || {}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SchemaEditorPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-full text-black/50 dark:text-white/50 py-20">
        <Spinner className="w-8 h-8 text-black/50 mb-4" />
        <p className="font-light tracking-wide">Loading Editor...</p>
      </div>
    }>
      <SchemaEditorContent />
    </Suspense>
  );
}
