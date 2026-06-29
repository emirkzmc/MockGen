"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Network, Database, ScrollText, Settings, LogOut, User } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
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

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Endpoints", href: "/endpoints", icon: Network },
    { name: "Schema Editor", href: "/schema-editor", icon: Database },
    { name: "Logs & Analytics", href: "/logs", icon: ScrollText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-[#260F09] text-[#EDEBDE] overflow-hidden">
      <aside className="w-64 border-r border-white/5 flex flex-col justify-between shrink-0 z-10">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-12">
            <Network className="text-[#810100] w-6 h-6" />
            <span className="text-xl font-light tracking-widest text-[#EDEBDE] uppercase">MockGen</span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-3 transition-colors duration-200 ${
                    isActive 
                      ? "text-[#EDEBDE] font-medium border-r-2 border-[#810100] bg-white/5" 
                      : "text-white/40 hover:bg-white/2 hover:text-white/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm tracking-wide">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-8 border-t border-white/5">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <User className="w-4 h-4 text-white/50" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/70 truncate">Admin</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              router.push("/login");
            }}
            className="flex w-full items-center space-x-4 px-4 py-2 text-sm text-white/40 hover:text-[#810100] transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="tracking-wide">Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-12 relative z-0">
        {children}
      </main>
    </div>
  );
}
