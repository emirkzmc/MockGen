"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateEndpoint, useUpdateEndpoint, useGetEndpoint } from "@/lib/query/useEndpoints";
import { Save, Plus, Trash2, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

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
    setFields([...fields, { id: Date.now().toString(), name: "newField", type: "string" }]);
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
            toast.success("Endpoint updated successfully");
            router.push("/endpoints");
          },
          onError: () => toast.error("Failed to update endpoint")
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Endpoint created successfully");
          router.push("/endpoints");
        },
        onError: () => toast.error("Failed to create endpoint")
      });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-black">
        <RefreshCw className="w-10 h-10 animate-spin mb-4" />
        <p className="font-medium">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/endpoints" className="p-2.5 text-black hover:bg-black/10 rounded-xl transition-all duration-300 cursor-pointer shadow-sm border border-transparent hover:border-black/10">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-black drop-shadow-sm">{editId ? "Edit Endpoint" : "Create New Endpoint"}</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#BABABA]/55 border border-[#a4a4a4] text-black font-semibold rounded-xl hover:scale-105 hover:bg-[#BABABA]/70 transition-all duration-300 shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{isSaving ? "Saving..." : "Save Endpoint"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 border border-white/50 p-6 flex flex-col h-full overflow-y-auto">
          <h2 className="text-xl font-bold text-black mb-6 border-b border-black/10 pb-4">Configuration</h2>
          
          <div className="space-y-6 flex-1">
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-[#404040] mb-2 uppercase tracking-wide">Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#a4a4a4] bg-white/50 backdrop-blur-sm rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black font-medium transition-all"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-[#404040] mb-2 uppercase tracking-wide">Endpoint Path</label>
                <input
                  type="text"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  placeholder="/api/users"
                  className="w-full px-4 py-2.5 border border-[#a4a4a4] bg-white/50 backdrop-blur-sm rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-black focus:border-black font-mono text-black placeholder:text-[#999999] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#404040] mb-2 uppercase tracking-wide">Mock Count (Array length)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 border border-[#a4a4a4] bg-white/50 backdrop-blur-sm rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black transition-all"
              />
            </div>

            <div className="pt-6 border-t border-black/10">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold text-black">Response Schema</h3>
                <button
                  onClick={addField}
                  className="inline-flex items-center space-x-1.5 text-sm text-black hover:text-[#404040] font-bold cursor-pointer transition-colors bg-white/50 px-3 py-1.5 rounded-lg border border-[#a4a4a4]/50 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Field</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {fields.map((field) => (
                  <div key={field.id} className="flex items-start space-x-3 bg-black/5 p-3 rounded-xl border border-black/10 shadow-inner">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={field.name}
                        onChange={(e) => updateField(field.id, "name", e.target.value)}
                        placeholder="field_name"
                        className="w-full px-3 py-2 border border-[#a4a4a4]/60 bg-white/60 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black font-mono text-sm text-black placeholder:text-[#999999]"
                      />
                    </div>
                    <div className="flex-1">
                      <select
                        value={field.type}
                        onChange={(e) => updateField(field.id, "type", e.target.value as SchemaField["type"])}
                        className="w-full px-3 py-2 border border-[#a4a4a4]/60 bg-white/60 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm text-black font-medium"
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="uuid">UUID</option>
                        <option value="date">Date</option>
                        <option value="object">Object</option>
                        <option value="array">Array</option>
                      </select>
                    </div>
                    <button
                      onClick={() => removeField(field.id)}
                      className="p-2 text-[#404040] hover:text-white hover:bg-black rounded-lg transition-all duration-200 cursor-pointer shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl shadow-inner border border-[#404040]/50 p-6 flex flex-col h-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none"></div>
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h2 className="text-lg font-bold text-[#d4d4d4] flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a4a4a4] animate-pulse shadow-[0_0_8px_rgba(164,164,164,0.6)]"></span>
              <span>Live Preview</span>
            </h2>
            <div className="text-xs text-[#a4a4a4] font-mono bg-[#2a2a2a] px-2 py-1 rounded-md border border-[#404040]">
              {method} {path}
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-[#111111] rounded-xl p-5 border border-[#2a2a2a] font-mono text-sm text-[#cccccc] relative z-10 shadow-inner">
            <pre className="whitespace-pre-wrap break-all">
              {JSON.stringify(generatePreview(), null, 2)}
            </pre>
            {count > 3 && (
              <div className="mt-4 text-[#777777] italic border-t border-[#333] pt-3">
                ... ({count - 3} more items not shown in preview)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SchemaEditorPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-full text-black p-24">
        <RefreshCw className="w-10 h-10 animate-spin mb-4" />
        <p className="font-medium">Loading Editor...</p>
      </div>
    }>
      <SchemaEditorContent />
    </Suspense>
  );
}
