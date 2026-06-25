import Link from "next/link";
import { Network, Activity, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black drop-shadow-sm">Dashboard</h1>
        <Link
          href="/schema-editor"
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#BABABA]/55 border border-[#a4a4a4] text-black font-semibold rounded-xl hover:scale-105 hover:bg-[#BABABA]/70 transition-all duration-300 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Endpoint</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/40 backdrop-blur-xl p-6 rounded-2xl shadow-lg shadow-black/5 border border-white/50 flex items-center space-x-5 transition-transform hover:-translate-y-1 duration-300">
          <div className="p-4 bg-black/10 text-black rounded-xl border border-white/30 shadow-inner">
            <Network className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#404040] uppercase tracking-wider">Total Endpoints</p>
            <p className="text-4xl font-bold text-black mt-1">12</p>
          </div>
        </div>
        <div className="bg-white/40 backdrop-blur-xl p-6 rounded-2xl shadow-lg shadow-black/5 border border-white/50 flex items-center space-x-5 transition-transform hover:-translate-y-1 duration-300">
          <div className="p-4 bg-black/10 text-black rounded-xl border border-white/30 shadow-inner">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#404040] uppercase tracking-wider">Active Requests (24h)</p>
            <p className="text-4xl font-bold text-black mt-1">1,482</p>
          </div>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 border border-white/50 overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-white/30 bg-white/20">
          <h2 className="text-xl font-bold text-black drop-shadow-sm">Recent Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#404040]">
            <thead className="bg-black/5 text-xs uppercase font-bold text-black border-b border-white/30">
              <tr>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Path</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/30">
              <tr className="hover:bg-white/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="bg-black/10 text-black px-2.5 py-1 rounded border border-black/10 text-xs font-bold">GET</span>
                </td>
                <td className="px-6 py-4 font-mono font-medium text-black">/api/users</td>
                <td className="px-6 py-4">
                  <span className="flex items-center text-black font-medium">
                    <span className="w-2 h-2 rounded-full bg-black mr-2 shadow-sm"></span>
                    200 OK
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">2 mins ago</td>
              </tr>
              <tr className="hover:bg-white/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="bg-black/10 text-black px-2.5 py-1 rounded border border-black/10 text-xs font-bold">POST</span>
                </td>
                <td className="px-6 py-4 font-mono font-medium text-black">/api/auth/login</td>
                <td className="px-6 py-4">
                  <span className="flex items-center text-black font-medium">
                    <span className="w-2 h-2 rounded-full bg-black mr-2 shadow-sm"></span>
                    201 Created
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">5 mins ago</td>
              </tr>
              <tr className="hover:bg-white/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="bg-black/10 text-black px-2.5 py-1 rounded border border-black/10 text-xs font-bold">GET</span>
                </td>
                <td className="px-6 py-4 font-mono font-medium text-black">/api/products</td>
                <td className="px-6 py-4">
                  <span className="flex items-center text-[#404040] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#404040] mr-2 shadow-sm"></span>
                    404 Not Found
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">15 mins ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
