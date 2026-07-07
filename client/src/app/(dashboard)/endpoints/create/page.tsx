"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetEndpoint } from "@/hooks/endpoints/useEndpoint";
import { useCreateEndpointMutation, useUpdateEndpointMutation } from "@/hooks/endpoints/useEndpointMutations";
import { useGetSchemas } from "@/hooks/schemas/useSchema";
import { Save, ArrowLeft, RefreshCw, Plus, Trash2 } from "lucide-react";
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
  const [requestSchemaId, setRequestSchemaId] = useState<string | null>(null);
  const [responses, setResponses] = useState<Array<{ statusCode: number; schemaId: string }>>([
    { statusCode: 200, schemaId: "" }
  ]);

  const { data: existingEndpoint, isLoading: isLoadingEndpoint } = useGetEndpoint(editId);
  const { data: schemas, isLoading: isLoadingSchemas } = useGetSchemas();
  const createMutation = useCreateEndpointMutation();
  const updateMutation = useUpdateEndpointMutation();

  useEffect(() => {
    if (existingEndpoint) {
      setPath(existingEndpoint.path);
      setMethod(existingEndpoint.method);
      setCount(existingEndpoint.count || 5);
      setRequestSchemaId(existingEndpoint.requestSchemaId || null);
      if (existingEndpoint.responses && existingEndpoint.responses.length > 0) {
        setResponses(existingEndpoint.responses.map(r => ({ statusCode: r.statusCode, schemaId: r.schemaId })));
      }
    }
  }, [existingEndpoint]);

  useEffect(() => {
    if (!editId && schemas && schemas.length > 0 && responses.length === 1 && responses[0].schemaId === "") {
      const newResponses = [...responses];
      newResponses[0].schemaId = schemas[0].id;
      setResponses(newResponses);
    }
  }, [schemas, editId, responses]);

  const handleSave = () => {
    if (!path.startsWith("/")) {
      toast.error("Path must start with /");
      return;
    }
    if (responses.length === 0) {
      toast.error("At least one response is required");
      return;
    }
    for (const r of responses) {
      if (!r.schemaId) {
        toast.error(`Please select a schema for status code ${r.statusCode}`);
        return;
      }
    }

    const payload = {
      path,
      method,
      count,
      requestSchemaId,
      responses,
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
            <p className="text-sm text-black/60 dark:text-white/40 mt-2 font-light">Define your API route and setup responses.</p>
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
            <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Request Schema (Optional)</label>
            {schemas && schemas.length > 0 ? (
              <PanelSelect
                value={requestSchemaId || ""}
                onChange={(e) => setRequestSchemaId(e.target.value || null)}
                options={[{ label: "None (No validation)", value: "" }, ...schemas.map(s => ({ label: s.name, value: s.id }))]}
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

      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-black/10 dark:border-white/5 pb-4">
          <h2 className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest">Responses</h2>
          <button 
            type="button" 
            onClick={() => setResponses([...responses, { statusCode: 400, schemaId: schemas?.[0]?.id || "" }])}
            className="flex items-center space-x-2 text-xs text-[#810100] hover:text-[#a10200] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Response</span>
          </button>
        </div>

        <div className="space-y-4">
          {responses.map((resp, index) => (
            <div key={index} className="flex items-center space-x-4 bg-black/5 dark:bg-white/5 p-4 rounded-lg">
              <div className="w-1/3">
                <label className="block text-[10px] text-black/50 dark:text-white/40 uppercase tracking-widest mb-2">Status Code</label>
                <PanelSelect
                  value={resp.statusCode.toString()}
                  onChange={(e) => {
                    const newResponses = [...responses];
                    newResponses[index].statusCode = parseInt(e.target.value);
                    setResponses(newResponses);
                  }}
                  options={[
                    { label: "200 OK", value: "200" },
                    { label: "201 Created", value: "201" },
                    { label: "204 No Content", value: "204" },
                    { label: "400 Bad Request", value: "400" },
                    { label: "401 Unauthorized", value: "401" },
                    { label: "403 Forbidden", value: "403" },
                    { label: "404 Not Found", value: "404" },
                    { label: "500 Internal Error", value: "500" },
                  ]}
                  className="w-full"
                />
              </div>
              <div className="w-2/3">
                <label className="block text-[10px] text-black/50 dark:text-white/40 uppercase tracking-widest mb-2">Response Schema</label>
                <div className="flex items-center space-x-4">
                  <PanelSelect
                    value={resp.schemaId}
                    onChange={(e) => {
                      const newResponses = [...responses];
                      newResponses[index].schemaId = e.target.value;
                      setResponses(newResponses);
                    }}
                    options={schemas?.map(s => ({ label: s.name, value: s.id })) || []}
                    className="w-full flex-grow"
                  />
                  {responses.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => {
                        const newResponses = [...responses];
                        newResponses.splice(index, 1);
                        setResponses(newResponses);
                      }}
                      className="text-black/40 dark:text-white/40 hover:text-[#810100] dark:hover:text-[#810100] transition-colors p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
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
