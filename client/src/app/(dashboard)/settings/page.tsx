"use client";

import { Save, Key } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-black drop-shadow-sm">Settings</h1>
        <p className="text-[#404040] mt-1 font-medium">Manage your account and API configuration.</p>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 border border-white/50 p-8">
        <h2 className="text-xl font-bold text-black mb-6 border-b border-black/10 pb-4">Profile Information</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#404040] mb-2 uppercase tracking-wide">Full Name</label>
              <input
                type="text"
                defaultValue="Admin User"
                className="w-full px-4 py-2.5 border border-[#a4a4a4] bg-white/50 backdrop-blur-sm rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black font-medium transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#404040] mb-2 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                defaultValue="admin@mockgen.io"
                className="w-full px-4 py-2.5 border border-[#a4a4a4] bg-white/50 backdrop-blur-sm rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black font-medium transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#404040] mb-2 uppercase tracking-wide">Timezone</label>
            <select className="w-full md:w-1/2 px-4 py-2.5 border border-[#a4a4a4] bg-white/50 backdrop-blur-sm rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black font-medium transition-all">
              <option>UTC (Coordinated Universal Time)</option>
              <option>EST (Eastern Standard Time)</option>
              <option>PST (Pacific Standard Time)</option>
            </select>
          </div>
          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#BABABA]/55 border border-[#a4a4a4] text-black font-semibold rounded-xl hover:scale-105 hover:bg-[#BABABA]/70 transition-all duration-300 shadow-sm cursor-pointer"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 border border-white/50 p-8">
        <div className="flex items-center space-x-3 mb-6 border-b border-black/10 pb-4">
          <Key className="w-6 h-6 text-black" />
          <h2 className="text-xl font-bold text-black">API Configuration</h2>
        </div>
        <div className="space-y-5">
          <p className="text-sm font-medium text-[#404040]">
            Use this Global API Key to authenticate external requests to your mock endpoints if authorization is required.
          </p>
          <div>
            <label className="block text-sm font-semibold text-[#404040] mb-2 uppercase tracking-wide">Global API Key</label>
            <div className="flex space-x-3">
              <input
                type="text"
                readOnly
                value="mk_live_9f8d7c6b5a41234567890abcdef"
                className="w-full font-mono bg-black/5 text-black px-4 py-2.5 border border-[#a4a4a4]/50 rounded-xl shadow-inner outline-none font-medium"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText("mk_live_9f8d7c6b5a41234567890abcdef");
                  toast.success("API Key copied");
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-black text-white font-semibold rounded-xl hover:scale-105 hover:bg-black/80 transition-all duration-300 shadow-lg shadow-black/20 cursor-pointer whitespace-nowrap"
              >
                Copy Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
