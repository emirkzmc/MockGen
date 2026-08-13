"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User, X } from "lucide-react";
import type { NavItem } from "@/constants/SidebarNavigation";

interface SidebarProps {
  items: NavItem[];
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function Sidebar({ items, isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    document.cookie = "authToken=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  const [userName, setUserName] = React.useState("User");

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
          setUserName(payload.fullName);
        } else if (payload.email) {
          setUserName(payload.email);
        }
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
  }, []);

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 w-72 md:w-64 border-r border-black/10 dark:border-white/5 
        bg-[#EDEBDE] dark:bg-[#260F09] md:bg-transparent dark:md:bg-transparent flex flex-col justify-between shrink-0 
        transition-all duration-300 ease-in-out md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="p-8">
        <div className="flex items-center justify-center mb-12 relative">
          <span className="text-2xl sm:text-3xl font-light tracking-widest text-[#260F09] dark:text-[#EDEBDE] uppercase">MockGen</span>
          {/* Mobile Close Button */}
          {setIsOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden absolute -right-4 p-2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen && setIsOpen(false)}
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
        <div className="flex items-center justify-center space-x-3 max-w-37.5">
          <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-black/50 dark:text-white/50" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-black/70 dark:text-white/70 truncate" title={userName}>{userName}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center justify-center p-2 text-black/40 dark:text-white/40 hover:text-[#810100] dark:hover:text-[#810100] transition-colors duration-200"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
