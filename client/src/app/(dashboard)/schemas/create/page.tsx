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

function FieldRow({ field, updateField, removeField, addSubField, depth = 0 }: { field: SchemaField, updateField: (id: string, key: keyof SchemaField, value: string | SchemaField[]) => void, removeField: (id: string) => void, addSubField: (parentId: string) => void, depth?: number }) {
  return (
    <div className="flex flex-col space-y-3 relative">
      {depth > 0 && (
        <>
          <div className="absolute -left-5 -top-3 bottom-5 w-px bg-black/10 dark:bg-white/10" />
          <div className="absolute -left-5 bottom-5 w-4 h-px bg-black/10 dark:bg-white/10" />
        </>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 group w-full">
        <div className="flex-1 w-full">
          {depth === 0 && <label className="block text-[10px] text-black/40 dark:text-white/30 uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Field Name</label>}
          <PanelInput
            type="text"
            value={field.name}
            onChange={(e) => updateField(field.id, "name", e.target.value)}
            placeholder="field_name"
            className="px-2 py-2 text-sm font-mono border-black/20 dark:border-white/10"
          />
        </div>
        <div className="flex-1 w-full">
          {depth === 0 && <label className="block text-[10px] text-black/40 dark:text-white/30 uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Type</label>}
          <PanelSelect
            value={field.type}
            onChange={(e) => updateField(field.id, "type", e.target.value as SchemaField["type"])}
            options={[
              { label: "ID (Sequential)", value: "id" },
              { label: "String", value: "string" },
              { label: "Number", value: "number" },
              { label: "Boolean", value: "boolean" },
              { label: "UUID", value: "uuid" },
              { label: "Date", value: "date" },
              { label: "Object", value: "object" },
              { label: "Array", value: "array" },
              { label: "Email", value: "email" },
              { label: "Full Name", value: "name" },
              { label: "First Name", value: "firstName" },
              { label: "Last Name", value: "lastName" },
              { label: "Age", value: "age" },
              { label: "Is Active", value: "isActive" },
              { label: "City", value: "city" },
              { label: "Phone", value: "phone" },
            ]}
            className="px-2 py-2 text-sm border-black/20 dark:border-white/10 w-full"
          />
        </div>
        <PanelIconButton
          icon={<Trash2 className="w-4 h-4" />}
          onClick={() => removeField(field.id)}
          variant="danger"
          className={depth === 0 ? "pb-3" : ""}
          title="Delete"
        />
      </div>

      {field.type === 'array' && (
        <div className="flex flex-col space-y-4 pl-8 pt-2">
          {field.subFields?.map((subField) => (
            <FieldRow
              key={subField.id}
              field={subField}
              updateField={updateField}
              removeField={removeField}
              addSubField={addSubField}
              depth={depth + 1}
            />
          ))}
          <div className="relative">
            <div className="absolute -left-5 -top-4 bottom-4 w-px bg-black/10 dark:bg-white/10" />
            <div className="absolute -left-5 bottom-4 w-4 h-px bg-black/10 dark:bg-white/10" />
            <button
              onClick={() => addSubField(field.id)}
              className="cursor-pointer text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white uppercase tracking-widest flex items-center space-x-1 transition-colors mt-2"
            >
              <Plus className="w-3 h-3" />
              <span>Add Item Field</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
        return Object.entries(schemaObj).map(([fieldName, typeDef], index) => {
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
      fieldsList.forEach((f) => {
        if (f.name.trim()) {
          if (f.type === 'array') {
            sch[f.name.trim()] = { type: 'array', itemType: buildSchema(f.subFields || []) };
          } else {
            sch[f.name.trim()] = f.type;
          }
        }
      });
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
    <div className="space-y-12 w-full">
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
            
            <div className="space-y-4">
              {fields.map((field) => (
                <FieldRow key={field.id} field={field} updateField={updateField} removeField={removeField} addSubField={addSubField} />
              ))}
            </div>
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
    </div>
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
