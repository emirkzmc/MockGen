"use client";

import { useGetSchemas } from "@/hooks/schemas/useSchema";
import { useDeleteSchemaMutation } from "@/hooks/schemas/useSchemaMutations";
import { Plus, Edit, Trash2, Loader2, AlertCircle, Database } from "lucide-react";
import { PanelButton } from "@/components/ui/PanelButton";
import { PanelIconButton } from "@/components/ui/PanelIconButton";
import toast from "react-hot-toast";

export default function SchemasPage() {
  const { data: schemas, isLoading, error } = useGetSchemas();
  const deleteMutation = useDeleteSchemaMutation();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this schema?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success("Schema deleted successfully"),
        onError: () => toast.error("Failed to delete schema")
      });
    }
  };

  return (
    <div className="space-y-16 w-full">
      <div className="flex justify-between items-end border-b border-black/10 dark:border-white/10 pb-8">
        <div>
          <h1 className="text-3xl font-light text-black dark:text-white tracking-wide">Schemas</h1>
          <p className="text-sm text-black/60 dark:text-white/40 mt-2 font-light">Manage and create new data models (schemas) to use in your endpoints.</p>
        </div>
        <PanelButton href="/schemas/create" icon={<Plus className="w-4 h-4" />}>
          Create Schema
        </PanelButton>
      </div>

      <div className="pt-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-black/50 dark:text-white/50">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="font-light tracking-wide">Loading schemas...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-400/80">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p className="font-light tracking-wide">Failed to load schemas. Please try again.</p>
          </div>
        ) : !schemas || schemas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-black/10 dark:border-white/5 rounded-2xl bg-black/5 dark:bg-white/2">
            <Database className="w-12 h-12 text-black/20 dark:text-white/20 mb-6" />
            <h3 className="text-xl font-light text-black dark:text-white mb-2 tracking-wide">No schemas found</h3>
            <p className="text-black/50 dark:text-white/40 mb-8 font-light">Get started by creating your first data model.</p>
            <PanelButton href="/schemas/create" icon={<Plus className="w-4 h-4" />}>
              Create Schema
            </PanelButton>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-black/80 dark:text-white/70">
              <thead className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest border-b border-black/10 dark:border-white/5">
                <tr>
                  <th className="pb-4 font-normal">Name</th>
                  <th className="pb-4 font-normal">Fields Count</th>
                  <th className="pb-4 font-normal">Created At</th>
                  <th className="pb-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/5">
                {schemas.map((schema) => (
                  <tr key={schema.id} className="hover:bg-black/5 dark:hover:bg-white/2 transition-colors">
                    <td className="py-5 font-medium tracking-wide text-black/90 dark:text-white/90">
                      {schema.name}
                    </td>
                    <td className="py-5">
                      <span className="text-black/50 dark:text-white/40 font-light">
                        {Object.keys(schema.schema).length} fields
                      </span>
                    </td>
                    <td className="py-5">
                      <span className="text-black/50 dark:text-white/40 font-light">
                        {new Date(schema.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-5 flex justify-end space-x-4">
                      <PanelIconButton 
                        icon={<Edit className="w-4 h-4" />} 
                        href={`/schemas/create?id=${schema.id}`} 
                        title="Edit" 
                      />
                      <PanelIconButton 
                        icon={<Trash2 className="w-4 h-4" />} 
                        onClick={() => handleDelete(schema.id)} 
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
