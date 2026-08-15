"use client";

import React from "react";
import { Save, Key } from "lucide-react";
import toast from "react-hot-toast";
import { PanelInput } from "@/components/ui/PanelInput";
import { PanelSelect } from "@/components/ui/PanelSelect";
import { PanelButton } from "@/components/ui/PanelButton";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function SettingsPage() {
  const [userName, setUserName] = React.useState("User Name");
  const [userEmail, setUserEmail] = React.useState("user@mockgen.io");

  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        if (!base64Url) throw new Error("Invalid token format");
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        if (payload.fullName) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setUserName(payload.fullName);
        }
        if (payload.email) {
          setUserEmail(payload.email);
        }
      } catch {
        // Ignore decoding errors
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully");
  };

  return (
    <section className="space-y-16 w-full">
      <header className="border-b border-black/10 dark:border-white/10 pb-8">
        <h1 className="text-3xl font-light text-black dark:text-white tracking-wide">Settings</h1>
        <p className="text-sm text-black/60 dark:text-white/40 mt-2 font-light">Manage your account and API configuration.</p>
      </header>

      <section className="space-y-12">
        <div>
          <h2 className="text-xs text-black/40 dark:text-white/30 uppercase tracking-widest border-b border-black/10 dark:border-white/5 pb-4 mb-8">Appearance</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
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
                  value={userName}
                  readOnly
                  className="bg-black/5 dark:bg-white/5"
                />
              </div>
              <div>
                <label className="block text-xs text-black/50 dark:text-white/40 uppercase tracking-widest mb-3">Email Address</label>
                <PanelInput
                  type="email"
                  value={userEmail}
                  readOnly
                  className="bg-black/5 dark:bg-white/5"
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
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-start sm:items-end w-full">
                <PanelInput
                  type="text"
                  readOnly
                  value="mk_live_9f8d7c6b5a41234567890abcdef"
                  className="font-mono text-black/80 dark:text-white/70 w-full md:w-auto"
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
      </section>
    </section>
  );
}
