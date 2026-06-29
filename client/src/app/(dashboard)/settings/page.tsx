"use client";

import { Save, Key } from "lucide-react";
import toast from "react-hot-toast";
import { PanelInput } from "@/components/ui/PanelInput";
import { PanelSelect } from "@/components/ui/PanelSelect";
import { PanelButton } from "@/components/ui/PanelButton";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function SettingsPage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-16 max-w-4xl">
      <div className="border-b border-black/10 dark:border-white/10 pb-8">
        <h1 className="text-3xl font-light text-black dark:text-white tracking-wide">Settings</h1>
        <p className="text-sm text-black/60 dark:text-white/40 mt-2 font-light">Manage your account and API configuration.</p>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest border-b border-black/10 dark:border-white/5 pb-4 mb-8">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-black/80 dark:text-white/80 mb-1">Theme</label>
              <p className="text-xs text-black/50 dark:text-white/40 font-light">Select your preferred color theme.</p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <div>
          <h2 className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest border-b border-black/10 dark:border-white/5 pb-4 mb-8">Profile Information</h2>
          <form onSubmit={handleSave} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Full Name</label>
                <PanelInput
                  type="text"
                  defaultValue="Admin User"
                />
              </div>
              <div>
                <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Email Address</label>
                <PanelInput
                  type="email"
                  defaultValue="admin@mockgen.io"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Timezone</label>
              <PanelSelect 
                options={[
                  { label: "UTC (Coordinated Universal Time)", value: "UTC" },
                  { label: "EST (Eastern Standard Time)", value: "EST" },
                  { label: "PST (Pacific Standard Time)", value: "PST" }
                ]}
                className="md:w-1/2"
              />
            </div>
            <div className="pt-4 flex justify-end">
              <PanelButton type="submit" icon={<Save className="w-4 h-4" />}>
                Save Changes
              </PanelButton>
            </div>
          </form>
        </div>

        <div className="pt-8">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/5 pb-4 mb-8">
            <h2 className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest">API Configuration</h2>
            <Key className="w-4 h-4 text-black/30 dark:text-white/20" />
          </div>
          <div className="space-y-6">
            <p className="text-sm font-light text-black/60 dark:text-white/50">
              Use this Global API Key to authenticate external requests to your mock endpoints if authorization is required.
            </p>
            <div>
              <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Global API Key</label>
              <div className="flex space-x-6 items-end">
                <PanelInput
                  type="text"
                  readOnly
                  value="mk_live_9f8d7c6b5a41234567890abcdef"
                  className="font-mono text-black/80 dark:text-white/70"
                />
                <PanelButton
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText("mk_live_9f8d7c6b5a41234567890abcdef");
                    toast.success("API Key copied");
                  }}
                >
                  Copy Key
                </PanelButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
