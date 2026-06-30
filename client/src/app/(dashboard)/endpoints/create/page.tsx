"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetEndpoint } from "@/hooks/endpoints/useEndpoint";
import { useCreateEndpointMutation, useUpdateEndpointMutation } from "@/hooks/endpoints/useEndpointMutations";
import { useGetSchemas } from "@/hooks/schemas/useSchema";
import { Save, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { PanelInput } from "@/components/ui/PanelInput";
import { PanelSelect } from "@/components/ui/PanelSelect";
import { PanelButton } from "@/components/ui/PanelButton";

function EndpointEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [path, setPath] = useState("/api/v1/");
  const [method, setMethod] = useState("GET");
  const [count, setCount] = useState(5);
  const [schemaId, setSchemaId] = useState("");

  const { data: existingEndpoint, isLoading: isLoadingEndpoint } = useGetEndpoint(editId);
  const { data: schemas, isLoading: isLoadingSchemas } = useGetSchemas();
  const createMutation = useCreateEndpointMutation();
  const updateMutation = useUpdateEndpointMutation();

  useEffect(() => {
    if (existingEndpoint) {
      setPath(existingEndpoint.path);
      setMethod(existingEndpoint.method);
      setCount(existingEndpoint.count || 5);
      setSchemaId(existingEndpoint.schemaId || "");
    }
  }, [existingEndpoint]);

  useEffect(() => {
    if (!editId && schemas && schemas.length > 0 && !schemaId) {
      setSchemaId(schemas[0].id);
    }
  }, [schemas, editId, schemaId]);

  const handleSave = () => {
    if (!path.startsWith("/")) {
      toast.error("Path must start with /");
      return;
    }
    if (!schemaId) {
      toast.error("Please select a schema");
      return;
    }

    const payload = {
      path,
      method,
      count,
      schemaId,
    };

    if (editId) {
      updateMutation.mutate(
        { id: editId, payload },
        {
          onSuccess: () => {
            router.push("/endpoints");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          router.push("/endpoints");
        },
      });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isLoading = isLoadingEndpoint || isLoadingSchemas;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-black/50 dark:text-white/50 py-20">
        <RefreshCw className="w-8 h-8 animate-spin mb-4" />
        <p className="font-light tracking-wide">Loading Editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 w-full">
      <div className="flex justify-between items-end border-b border-black/10 dark:border-white/10 pb-8">
        <div className="flex items-center space-x-6">
          <Link href="/endpoints" className="text-black/60 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-light text-black dark:text-white tracking-wide">{editId ? "Edit Endpoint" : "New Endpoint"}</h1>
            <p className="text-sm text-black/60 dark:text-white/40 mt-2 font-light">Define your API route and select a schema.</p>
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

      <div className="space-y-8">
        <h2 className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest border-b border-black/10 dark:border-white/5 pb-4">Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Endpoint Path</label>
            <PanelInput
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/api/v1/users"
              className="font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Method</label>
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
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Select Schema</label>
            {schemas && schemas.length > 0 ? (
              <PanelSelect
                value={schemaId}
                onChange={(e) => setSchemaId(e.target.value)}
                options={schemas.map(s => ({ label: s.name, value: s.id }))}
                className="w-full"
              />
            ) : (
              <div className="text-sm text-black/60 dark:text-white/50 italic py-2">
                No schemas available. <Link href="/schemas/create" className="text-[#810100] underline">Create one first.</Link>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Response Count</label>
            <PanelInput
              type="number"
              min="1"
              max="500"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EndpointEditorPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-full text-black/50 dark:text-white/50 py-20">
        <RefreshCw className="w-8 h-8 animate-spin mb-4" />
        <p className="font-light tracking-wide">Loading Editor...</p>
      </div>
    }>
      <EndpointEditorContent />
    </Suspense>
  );
}
