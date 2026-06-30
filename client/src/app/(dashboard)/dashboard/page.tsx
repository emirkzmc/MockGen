"use client";

import { Plus } from "lucide-react";
import { PanelButton } from "@/components/ui/PanelButton";
import { useGetEndpoints, useGetLogs } from "@/hooks/endpoints/useEndpoint";

export default function DashboardPage() {
  const { data: endpoints, isLoading: isLoadingEndpoints } = useGetEndpoints();
  const { data: logs, isLoading: isLoadingLogs } = useGetLogs();

  const totalEndpoints = endpoints?.length || 0;
  const recentLogs = logs ? logs.slice(0, 5) : [];

  return (
    <div className="space-y-16 w-full">
      <div className="flex justify-between items-end border-b border-black/10 dark:border-white/10 pb-8">
        <div>
          <h1 className="text-3xl font-light text-black dark:text-white tracking-wide">Overview</h1>
          <p className="text-sm text-black/60 dark:text-white/40 mt-2 font-light">Manage your endpoints and requests.</p>
        </div>
        <PanelButton href="/endpoints/create" icon={<Plus className="w-4 h-4" />}>
          New Endpoint
        </PanelButton>
      </div>

      <div className="grid grid-cols-2 gap-12">
        <div>
          <p className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest mb-3">Total Endpoints</p>
          <p className="text-6xl font-light text-[#260F09] dark:text-[#EDEBDE]">
            {isLoadingEndpoints ? "-" : totalEndpoints}
          </p>
        </div>
        <div>
          <p className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest mb-3">Total Requests (Logs)</p>
          <p className="text-6xl font-light text-[#260F09] dark:text-[#EDEBDE]">
            {isLoadingLogs ? "-" : (logs?.length || 0)}
          </p>
        </div>
      </div>

      <div className="pt-8">
        <h2 className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest mb-8">Recent Requests</h2>
        <div className="overflow-x-auto">
          {isLoadingLogs ? (
            <div className="text-black/50 dark:text-white/50 text-sm">Loading logs...</div>
          ) : recentLogs.length === 0 ? (
            <div className="text-black/50 dark:text-white/50 text-sm italic">No recent requests.</div>
          ) : (
            <table className="w-full text-left text-sm text-black/80 dark:text-white/70">
              <thead className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest border-b border-black/10 dark:border-white/5">
                <tr>
                  <th className="pb-4 font-normal">Method</th>
                  <th className="pb-4 font-normal">Path</th>
                  <th className="pb-4 font-normal">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/5">
                {recentLogs.map((log) => (
                  <tr key={String(log.id)} className="hover:bg-black/5 dark:hover:bg-white/2 transition-colors">
                    <td className="py-5">
                      <span className={`font-medium tracking-wide ${String(log.method) === 'GET' ? 'text-[#810100]' : 'text-black/80 dark:text-white/80'}`}>
                        {String(log.method)}
                      </span>
                    </td>
                    <td className="py-5 font-mono text-black/90 dark:text-white/90">{String(log.path)}</td>
                    <td className="py-5 text-black/50 dark:text-white/40">{String(log.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
