"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { DASHBOARD_NAV_ITEMS } from "@/constants/SidebarNavigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen w-full bg-[#EDEBDE] dark:bg-[#260F09] text-[#260F09] dark:text-[#EDEBDE] overflow-hidden relative transition-colors duration-300">
      {/* Background glowing div */}
      <div className="absolute left-0 top-0 h-full w-[400px] rounded-full blur-3xl bg-[#C57677] dark:bg-[#630102] -translate-x-1/2 opacity-60 pointer-events-none z-0 transition-colors duration-300" />
      
      <div className="flex h-full w-full z-10 relative">
        <Sidebar items={DASHBOARD_NAV_ITEMS} />
        <main className="flex-1 overflow-auto p-12 relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
}
