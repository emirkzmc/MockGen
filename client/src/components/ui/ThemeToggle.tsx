"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

const OPTIONS = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "system", icon: Monitor, label: "System" },
  { value: "dark", icon: Moon, label: "Dark" },
];

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-full max-w-60 rounded-full bg-black/5 dark:bg-white/5" />;
  }

  return (
    <div className="relative flex items-center p-1 px-2 rounded-full bg-black/5 dark:bg-white/5 w-full max-w-74.5">
      {OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = theme === option.value;
        
        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`relative flex-1 flex items-center justify-center px-4 space-x-2 py-2 text-sm z-10 transition-colors duration-200 cursor-pointer ${
              isActive 
                ? "text-[#EDEBDE]"
                : "text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="theme-toggle-pill"
                className="absolute inset-0 rounded-full bg-[#810100] z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon className="w-4 h-4" />
            <span className="font-medium tracking-wide">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
