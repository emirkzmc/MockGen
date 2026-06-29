"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateEndpoint, useUpdateEndpoint, useGetEndpoint } from "@/hooks/endpoints/useEndpoints";
import { Save, Plus, Trash2, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { PanelInput } from "@/components/ui/PanelInput";
import { PanelSelect } from "@/components/ui/PanelSelect";
import { PanelButton } from "@/components/ui/PanelButton";
import { PanelIconButton } from "@/components/ui/PanelIconButton";

interface SchemaField {
  id: string;
  name: string;
  type: "string" | "number" | "boolean" | "uuid" | "date" | "object" | "array";
}

function SchemaEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [path, setPath] = useState("/api/mock");
  const [method, setMethod] = useState("GET");
  const [count, setCount] = useState(5);
  const [fields, setFields] = useState<SchemaField[]>([
    { id: "1", name: "id", type: "uuid" },
    { id: "2", name: "name", type: "string" },
  ]);

  const { data: existingEndpoint, isLoading } = useGetEndpoint(editId);
  const createMutation = useCreateEndpoint();
  const updateMutation = useUpdateEndpoint();

  useEffect(() => {
    if (existingEndpoint) {
      setPath(existingEndpoint.path);
      setMethod(existingEndpoint.method);
      setCount(existingEndpoint.count);
      
      const parsedFields = Object.entries(existingEndpoint.schema).map(([name, type], index) => ({
        id: String(index),
        name,
        type: type as SchemaField["type"],
      }));
      if (parsedFields.length > 0) {
        setFields(parsedFields);
      }
    }
  }, [existingEndpoint]);

  const addField = () => {
    setFields([...fields, { id: Date.now().toString(), name: "new_field", type: "string" }]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id: string, key: keyof SchemaField, value: string) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const generatePreview = () => {
    const item: Record<string, unknown> = {};
    fields.forEach((field) => {
      if (!field.name) return;
      switch (field.type) {
        case "string": item[field.name] = "Sample String"; break;
        case "number": item[field.name] = 42; break;
        case "boolean": item[field.name] = true; break;
        case "uuid": item[field.name] = "123e4567-e89b-12d3-a456-426614174000"; break;
        case "date": item[field.name] = new Date().toISOString(); break;
        case "object": item[field.name] = { key: "value" }; break;
        case "array": item[field.name] = [1, 2, 3]; break;
        default: item[field.name] = "Unknown";
      }
    });

    if (count === 1) return item;
    return Array.from({ length: Math.min(count, 3) }, () => item);
  };

  const handleSave = () => {
    if (!path.startsWith("/")) {
      toast.error("Path must start with /");
      return;
    }

    const schema: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.name.trim()) schema[f.name.trim()] = f.type;
    });

    const payload = {
      path,
      method,
      count,
      schema,
    };

    if (editId) {
      updateMutation.mutate(
        { id: editId, payload },
        {
          onSuccess: () => {
            toast.success("Endpoint updated");
            router.push("/endpoints");
          },
          onError: () => toast.error("Failed to update")
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Endpoint created");
          router.push("/endpoints");
        },
        onError: () => toast.error("Failed to create")
      });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/50">
        <RefreshCw className="w-8 h-8 animate-spin mb-4" />
        <p className="font-light tracking-wide">Loading Editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-6xl">
      <div className="flex justify-between items-end border-b border-white/10 pb-8">
        <div className="flex items-center space-x-6">
          <Link href="/endpoints" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-light text-white tracking-wide">{editId ? "Edit Endpoint" : "New Endpoint"}</h1>
            <p className="text-sm text-white/40 mt-2 font-light">Define your API structure and mock data rules.</p>
          </div>
        </div>
        <PanelButton
          onClick={handleSave}
          disabled={isSaving}
          icon={isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        >
          {isSaving ? "Saving..." : "Save Endpoint"}
        </PanelButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 flex flex-col space-y-12">
          
          {/* Config Section */}
          <div className="space-y-8">
            <h2 className="text-xs text-white/30 uppercase tracking-widest border-b border-white/5 pb-4">Configuration</h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1">
                <label className="block text-xs text-white/40 uppercase tracking-widest mb-3">Method</label>
                <PanelSelect
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  options={[
                    { label: "GET", value: "GET" },
                    { label: "POST", value: "POST" },
                    { label: "PUT", value: "PUT" },
                    { label: "PATCH", value: "PATCH" },
                    { label: "DELETE", value: "DELETE" },
                  ]}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-white/40 uppercase tracking-widest mb-3">Endpoint Path</label>
                <PanelInput
                  type="text"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  placeholder="/api/users"
                  className="font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/40 uppercase tracking-widest mb-3">Mock Count</label>
              <PanelInput
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          {/* Schema Section */}
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-xs text-white/30 uppercase tracking-widest">Response Schema</h2>
              <button
                onClick={addField}
                className="text-xs text-white/60 hover:text-white uppercase tracking-widest flex items-center space-x-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Field</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="flex items-end space-x-6 group">
                  <div className="flex-1">
                    <label className="block text-[10px] text-white/30 uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Field Name</label>
                    <PanelInput
                      type="text"
                      value={field.name}
                      onChange={(e) => updateField(field.id, "name", e.target.value)}
                      placeholder="field_name"
                      className="px-2 py-2 text-sm font-mono border-white/10"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] text-white/30 uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Type</label>
                    <PanelSelect
                      value={field.type}
                      onChange={(e) => updateField(field.id, "type", e.target.value as SchemaField["type"])}
                      options={[
                        { label: "String", value: "string" },
                        { label: "Number", value: "number" },
                        { label: "Boolean", value: "boolean" },
                        { label: "UUID", value: "uuid" },
                        { label: "Date", value: "date" },
                        { label: "Object", value: "object" },
                        { label: "Array", value: "array" },
                      ]}
                      className="px-2 py-2 text-sm border-white/10"
                    />
                  </div>
                  <PanelIconButton
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => removeField(field.id)}
                    variant="danger"
                    className="pb-3"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="lg:col-span-5">
          <div className="sticky top-12 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-xs text-white/30 uppercase tracking-widest flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#810100] animate-pulse"></span>
                <span>Live Preview</span>
              </h2>
              <span className="text-xs text-white/40 font-mono tracking-wider">{method} {path}</span>
            </div>
            
            <div className="bg-white/2 border border-white/5 rounded-xl p-6 font-mono text-sm text-white/70 min-h-100 overflow-auto">
              <pre className="whitespace-pre-wrap break-all opacity-80">
                {JSON.stringify(generatePreview(), null, 2)}
              </pre>
              {count > 3 && (
                <div className="mt-6 text-white/30 italic text-xs">
                  ... ({count - 3} more items not shown)
                </div>
              )}
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
      <div className="flex flex-col items-center justify-center h-full text-white/50 py-20">
        <RefreshCw className="w-8 h-8 animate-spin mb-4" />
        <p className="font-light tracking-wide">Loading Editor...</p>
      </div>
    }>
      <SchemaEditorContent />
    </Suspense>
  );
}
