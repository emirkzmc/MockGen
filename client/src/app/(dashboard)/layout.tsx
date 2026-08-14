"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { DASHBOARD_NAV_ITEMS } from "@/constants/SidebarNavigation";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      document.cookie = "authToken=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen w-full bg-[#EDEBDE] dark:bg-[#260F09] text-[#260F09] dark:text-[#EDEBDE] overflow-hidden relative transition-colors duration-300">
      <div className="absolute left-0 top-0 h-full w-100 rounded-full blur-3xl bg-[#C57677] dark:bg-[#630102] -translate-x-1/2 opacity-60 pointer-events-none z-0 transition-colors duration-300" />
      
      <div className="flex h-full w-full z-10 relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <Sidebar items={DASHBOARD_NAV_ITEMS} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-auto p-6 md:p-12 relative z-0">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center mb-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
