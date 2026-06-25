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
    <div className="flex h-screen w-full bg-gradient-to-b from-white to-[#999999] text-black overflow-hidden">
      <aside className="w-64 border-r border-white/30 bg-white/20 backdrop-blur-xl flex flex-col justify-between shrink-0 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.1)] z-10">
        <div className="p-4">
          <div className="flex items-center space-x-2 px-2 mb-8">
            <div className="w-8 h-8 bg-black/80 rounded flex items-center justify-center shadow-inner">
              <Network className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-black">MockGen</span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-black/10 text-black font-semibold shadow-sm border border-white/20" 
                      : "text-[#404040] hover:bg-black/5 hover:text-black border border-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-white/30 bg-white/10">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center border border-white/20">
              <User className="w-4 h-4 text-[#404040]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-black truncate">Admin User</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              router.push("/login");
            }}
            className="mt-2 flex w-full items-center space-x-3 px-3 py-2 text-sm text-red-700/80 hover:bg-red-500/10 hover:text-red-800 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8 relative z-0">
        {children}
      </main>
    </div>
  );
}
