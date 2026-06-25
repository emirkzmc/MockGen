"use client";

import { useGetEndpoints, useDeleteEndpoint } from "@/lib/query/useEndpoints";
import Link from "next/link";
import { Plus, Copy, Edit, Trash2, Loader2, AlertCircle, Network } from "lucide-react";
import toast from "react-hot-toast";

export default function EndpointsPage() {
  const { data: endpoints, isLoading, error } = useGetEndpoints();
  const deleteMutation = useDeleteEndpoint();

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black drop-shadow-sm">Endpoints</h1>
        <Link
          href="/schema-editor"
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#BABABA]/55 border border-[#a4a4a4] text-black font-semibold rounded-xl hover:scale-105 hover:bg-[#BABABA]/70 transition-all duration-300 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Create New</span>
        </Link>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 border border-white/50 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-16 text-black">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-medium">Loading endpoints...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-16 text-[#404040]">
            <AlertCircle className="w-10 h-10 mb-4" />
            <p className="font-medium">Failed to load endpoints. Please try again.</p>
          </div>
        ) : !endpoints || endpoints.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <div className="w-20 h-20 bg-black/10 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/30">
              <Network className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">No endpoints found</h3>
            <p className="text-[#404040] mb-8 font-medium">Get started by creating your first mock endpoint.</p>
            <Link
              href="/schema-editor"
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-black text-white font-semibold rounded-xl hover:scale-105 hover:bg-black/80 transition-all duration-300 shadow-lg shadow-black/20"
            >
              <Plus className="w-5 h-5" />
              <span>Create Endpoint</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#404040]">
              <thead className="bg-black/5 text-xs uppercase font-bold text-black border-b border-white/30">
                <tr>
                  <th className="px-6 py-5">Method</th>
                  <th className="px-6 py-5">Path</th>
                  <th className="px-6 py-5">Mock Count</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/30">
                {endpoints.map((ep) => (
                  <tr key={ep.id} className="hover:bg-white/30 transition-colors">
                    <td className="px-6 py-5">
                      <span className="bg-black/10 text-black px-2.5 py-1 rounded border border-black/10 text-xs font-bold">
                        {ep.method}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-mono font-medium text-black">{ep.path}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/50 text-black border border-white/40 shadow-sm">
                        {ep.count} items
                      </span>
                    </td>
                    <td className="px-6 py-5 flex justify-end space-x-3">
                      <button
                        onClick={() => handleCopy(ep.path)}
                        className="p-2 text-[#404040] hover:text-black hover:bg-black/10 rounded-lg transition-all duration-200 cursor-pointer"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/schema-editor?id=${ep.id}`}
                        className="p-2 text-[#404040] hover:text-black hover:bg-black/10 rounded-lg transition-all duration-200 inline-block cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(ep.id)}
                        disabled={deleteMutation.isPending}
                        className="p-2 text-[#404040] hover:text-black hover:bg-black/10 rounded-lg transition-all duration-200 disabled:opacity-50 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
