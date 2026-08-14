"use client";

import { useGetLogs } from "@/hooks/endpoints/useEndpoint";
import { AlertCircle, ChevronDown, ChevronRight } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { useState } from "react";

export default function LogsPage() {
  const { data: logs, isLoading, error } = useGetLogs();
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-black/50 dark:text-white/50">
        <Spinner size="lg" className="mb-4" />
        <p className="font-light tracking-wide">Loading logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-400/80">
        <AlertCircle className="w-8 h-8 mb-4" />
        <p className="font-light tracking-wide">Failed to load logs.</p>
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  return (
    <div className="space-y-16 w-full">
      <div className="border-b border-black/10 dark:border-white/10 pb-8">
        <h1 className="text-3xl font-light text-black dark:text-white tracking-wide">Logs & Analytics</h1>
        <p className="text-sm text-black/60 dark:text-white/40 mt-2 font-light">View detailed incoming request payloads.</p>
      </div>

      <div className="pt-4">
        {(!logs || logs.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <h3 className="text-xl font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">No logs yet</h3>
            <p className="text-black/40 dark:text-white/30 font-light">Make requests to your mock endpoints to see them here.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/10 dark:divide-white/5">
            {logs.map((log) => (
              <div key={String(log.id)} className="flex flex-col">
                <div 
                  className="py-5 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/2 transition-colors cursor-pointer w-full overflow-hidden"
                  onClick={() => toggleExpand(String(log.id))}
                >
                  <div className="flex items-center space-x-2 sm:space-x-6 min-w-0">
                    <span className="text-black/40 dark:text-white/40">
                      {expandedLog === String(log.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>
                    <span className={`font-medium tracking-wide w-12 ${String(log.method) === 'GET' ? 'text-[#810100]' : 'text-black/80 dark:text-white/80'}`}>
                      {String(log.method)}
                    </span>
                    <span className="font-mono text-black/90 dark:text-white/90 truncate">{String(log.path)}</span>
                  </div>
                  <div className="text-sm text-black/40 dark:text-white/30 font-light">
                    {String(log.timestamp)}
                  </div>
                </div>
                {expandedLog === String(log.id) && (
                  <div className="pl-16 py-6 border-t border-black/10 dark:border-white/2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <h4 className="text-[10px] font-bold text-black/40 dark:text-white/30 uppercase tracking-widest mb-4">Request Headers</h4>
                        <pre className="bg-black/5 dark:bg-white/2 p-4 rounded border border-black/10 dark:border-white/5 text-xs font-mono text-black/60 dark:text-white/60 overflow-auto max-h-48">
                          {JSON.stringify(log.headers, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-black/40 dark:text-white/30 uppercase tracking-widest mb-4">Request Body</h4>
                        <pre className="bg-black/5 dark:bg-white/2 p-4 rounded border border-black/10 dark:border-white/5 text-xs font-mono text-black/60 dark:text-white/60 overflow-auto max-h-48">
                          {JSON.stringify(log.body || {}, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
