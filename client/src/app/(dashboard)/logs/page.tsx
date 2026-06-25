"use client";

import { useGetLogs } from "@/lib/query/useEndpoints";
import { Loader2, AlertCircle, ScrollText, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function LogsPage() {
  const { data: logs, isLoading, error } = useGetLogs();
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-24 text-black">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-medium">Loading logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-24 text-[#404040]">
        <AlertCircle className="w-10 h-10 mb-4" />
        <p className="font-medium">Failed to load logs.</p>
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black drop-shadow-sm">Logs & Analytics</h1>
        <p className="text-[#404040] mt-1 font-medium">View detailed incoming request payloads.</p>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 border border-white/50 overflow-hidden">
        {(!logs || logs.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <div className="w-20 h-20 bg-black/10 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/30">
              <ScrollText className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">No logs yet</h3>
            <p className="text-[#404040] font-medium">Make requests to your mock endpoints to see them here.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/30">
            {logs.map((log) => (
              <div key={String(log.id)} className="flex flex-col">
                <div 
                  className="px-6 py-5 flex items-center justify-between hover:bg-white/30 transition-colors cursor-pointer"
                  onClick={() => toggleExpand(String(log.id))}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-black">
                      {expandedLog === String(log.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </span>
                    <span className="bg-black/10 text-black px-2.5 py-1 rounded border border-black/10 text-xs font-bold">
                      {String(log.method)}
                    </span>
                    <span className="font-mono text-sm font-medium text-black">{String(log.path)}</span>
                  </div>
                  <div className="text-sm font-medium text-[#404040]">
                    {String(log.timestamp)}
                  </div>
                </div>
                {expandedLog === String(log.id) && (
                  <div className="px-6 py-5 bg-black/5 border-t border-black/10 shadow-inner">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <h4 className="text-xs font-bold text-black uppercase tracking-wider mb-2">Request Headers</h4>
                        <pre className="bg-[#1a1a1a] p-4 rounded-xl border border-[#404040] text-xs font-mono text-[#cccccc] overflow-auto max-h-48 shadow-inner">
                          {JSON.stringify(log.headers, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-black uppercase tracking-wider mb-2">Request Body</h4>
                        <pre className="bg-[#1a1a1a] p-4 rounded-xl border border-[#404040] text-xs font-mono text-[#cccccc] overflow-auto max-h-48 shadow-inner">
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
