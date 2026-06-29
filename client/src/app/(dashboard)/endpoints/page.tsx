"use client";

import { useGetEndpoints } from "@/hooks/endpoints/useEndpoint";
import { useDeleteEndpointMutation } from "@/hooks/endpoints/useEndpointMutations";
import { Plus, Copy, Edit, Trash2, Loader2, AlertCircle, Network } from "lucide-react";
import { PanelButton } from "@/components/ui/PanelButton";
import { PanelIconButton } from "@/components/ui/PanelIconButton";
import toast from "react-hot-toast";

export default function EndpointsPage() {
  const { data: endpoints, isLoading, error } = useGetEndpoints();
  const deleteMutation = useDeleteEndpointMutation();

  const handleCopy = (path: string) => {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}${path}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("URL copied to clipboard");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this endpoint?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success("Endpoint deleted successfully"),
        onError: () => toast.error("Failed to delete endpoint")
      });
    }
  };

  return (
    <div className="space-y-16 max-w-5xl">
      <div className="flex justify-between items-end border-b border-black/10 dark:border-white/10 pb-8">
        <div>
          <h1 className="text-3xl font-light text-black dark:text-white tracking-wide">Endpoints</h1>
          <p className="text-sm text-black/60 dark:text-white/40 mt-2 font-light">Manage and create new API endpoints.</p>
        </div>
        <PanelButton href="/schema-editor" icon={<Plus className="w-4 h-4" />}>
          Create New
        </PanelButton>
      </div>

      <div className="pt-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-black/50 dark:text-white/50">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="font-light tracking-wide">Loading endpoints...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-400/80">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p className="font-light tracking-wide">Failed to load endpoints. Please try again.</p>
          </div>
        ) : !endpoints || endpoints.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-black/10 dark:border-white/5 rounded-2xl bg-black/5 dark:bg-white/2">
            <Network className="w-12 h-12 text-black/20 dark:text-white/20 mb-6" />
            <h3 className="text-xl font-light text-black dark:text-white mb-2 tracking-wide">No endpoints found</h3>
            <p className="text-black/50 dark:text-white/40 mb-8 font-light">Get started by creating your first mock endpoint.</p>
            <PanelButton href="/schema-editor" icon={<Plus className="w-4 h-4" />}>
              Create Endpoint
            </PanelButton>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-black/80 dark:text-white/70">
              <thead className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest border-b border-black/10 dark:border-white/5">
                <tr>
                  <th className="pb-4 font-normal">Method</th>
                  <th className="pb-4 font-normal">Path</th>
                  <th className="pb-4 font-normal">Mock Count</th>
                  <th className="pb-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/5">
                {endpoints.map((ep) => (
                  <tr key={ep.id} className="hover:bg-black/5 dark:hover:bg-white/2 transition-colors">
                    <td className="py-5">
                      <span className={`font-medium tracking-wide ${ep.method === 'GET' ? 'text-[#810100]' : ep.method === 'POST' ? 'text-black/80 dark:text-white/80' : 'text-black/60 dark:text-white/60'}`}>
                        {ep.method}
                      </span>
                    </td>
                    <td className="py-5 font-mono text-black/90 dark:text-white/90">{ep.path}</td>
                    <td className="py-5">
                      <span className="text-black/50 dark:text-white/40 font-light">
                        {ep.count} items
                      </span>
                    </td>
                    <td className="py-5 flex justify-end space-x-4">
                      <PanelIconButton 
                        icon={<Copy className="w-4 h-4" />} 
                        onClick={() => handleCopy(ep.path)} 
                        title="Copy" 
                      />
                      <PanelIconButton 
                        icon={<Edit className="w-4 h-4" />} 
                        href={`/schema-editor?id=${ep.id}`} 
                        title="Edit" 
                      />
                      <PanelIconButton 
                        icon={<Trash2 className="w-4 h-4" />} 
                        onClick={() => handleDelete(ep.id)} 
                        disabled={deleteMutation.isPending} 
                        variant="danger" 
                        title="Delete" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
