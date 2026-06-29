import { Plus } from "lucide-react";
import { PanelButton } from "@/components/ui/PanelButton";

export default function DashboardPage() {
  return (
    <div className="space-y-16 max-w-5xl">
      <div className="flex justify-between items-end border-b border-white/10 pb-8">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Overview</h1>
          <p className="text-sm text-white/40 mt-2 font-light">Manage your endpoints and requests.</p>
        </div>
        <PanelButton href="/schema-editor" icon={<Plus className="w-4 h-4" />}>
          New Endpoint
        </PanelButton>
      </div>

      <div className="grid grid-cols-2 gap-12">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Total Endpoints</p>
          <p className="text-6xl font-light text-[#EDEBDE]">12</p>
        </div>
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Active Requests (24h)</p>
          <p className="text-6xl font-light text-[#EDEBDE]">1,482</p>
        </div>
      </div>

      <div className="pt-8">
        <h2 className="text-xs text-white/30 uppercase tracking-widest mb-8">Recent Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="text-xs text-white/30 uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="pb-4 font-normal">Method</th>
                <th className="pb-4 font-normal">Path</th>
                <th className="pb-4 font-normal">Status</th>
                <th className="pb-4 font-normal">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/2 transition-colors">
                <td className="py-5">
                  <span className="text-[#810100] font-medium tracking-wide">GET</span>
                </td>
                <td className="py-5 font-mono text-white/90">/api/users</td>
                <td className="py-5 text-[#EDEBDE]">200 OK</td>
                <td className="py-5 text-white/40">2 mins ago</td>
              </tr>
              <tr className="hover:bg-white/2 transition-colors">
                <td className="py-5">
                  <span className="text-white/80 font-medium tracking-wide">POST</span>
                </td>
                <td className="py-5 font-mono text-white/90">/api/auth/login</td>
                <td className="py-5 text-[#EDEBDE]">201 Created</td>
                <td className="py-5 text-white/40">5 mins ago</td>
              </tr>
              <tr className="hover:bg-white/2 transition-colors">
                <td className="py-5">
                  <span className="text-[#810100] font-medium tracking-wide">GET</span>
                </td>
                <td className="py-5 font-mono text-white/90">/api/products</td>
                <td className="py-5 text-white/50">404 Not Found</td>
                <td className="py-5 text-white/40">15 mins ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
