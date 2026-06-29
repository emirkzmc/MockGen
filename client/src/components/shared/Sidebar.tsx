"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User, Network } from "lucide-react";
import type { NavItem } from "@/constants/SidebarNavigation";

interface SidebarProps {
  items: NavItem[];
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <aside className="w-64 border-r border-black/10 dark:border-white/5 flex flex-col justify-between shrink-0 z-10 transition-colors duration-300">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-12">
          <Network className="text-[#810100] w-6 h-6" />
          <span className="text-xl font-light tracking-widest text-[#260F09] dark:text-[#EDEBDE] uppercase">MockGen</span>
        </div>
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-4 px-4 py-3 transition-colors duration-200 ${
                  isActive 
                    ? "text-[#810100] dark:text-[#EDEBDE] font-medium border-r-2 border-[#810100] bg-black/5 dark:bg-white/5" 
                    : "text-black/40 dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/2 hover:text-black/80 dark:hover:text-white/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex justify-center p-8 border-t border-black/10 dark:border-white/5 transition-colors duration-300">
        <div className="flex items-center justify-center space-x-3 ">
          <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
            <User className="w-4 h-4 text-black/50 dark:text-white/50" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-black/70 dark:text-white/70 truncate">Admin</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="cursor-pointer flex w-full items-center justify-center space-x-4  py-2 text-sm text-black/40 dark:text-white/40 hover:text-[#810100] dark:hover:text-[#810100] transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
