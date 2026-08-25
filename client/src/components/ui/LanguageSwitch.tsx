"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

export interface LanguageSwitchProps {
  value: "en" | "tr";
  onChange: (lang: "en" | "tr") => void;
}

export function LanguageSwitch({ value, onChange }: LanguageSwitchProps) {
  const isEn = value === "en";
  const shouldReduceMotion = useReducedMotion();

  // Direction: 1 for right, -1 for left
  const direction = isEn ? 1 : -1;

  const springTransition = {
    type: "spring",
    stiffness: 500,
    damping: 35,
  };

  const iconVariants = {
    initial: (isEnTarget: boolean) => ({
      opacity: 0,
      scale: 0.8,
      x: shouldReduceMotion ? 0 : (isEnTarget ? 16 : -16),
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: springTransition,
    },
    exit: (isEnTarget: boolean) => ({
      opacity: 0,
      scale: 0.8,
      x: shouldReduceMotion ? 0 : (isEnTarget ? -16 : 16),
      transition: springTransition,
    }),
  };

  const idleVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 0.4, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEn}
      aria-label={`Switch to ${isEn ? "Turkish" : "English"}`}
      onClick={() => onChange(isEn ? "tr" : "en")}
      className="relative flex items-center w-[72px] h-10 p-1 rounded-full bg-white/10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/20 transition-colors"
    >
      {/* Idle TR Icon on the left (shown when EN is active) */}
      <div className="absolute left-1 top-1 w-8 h-8 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {isEn && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={idleVariants}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/turkishflag.png"
                alt="Turkish Idle"
                width={20}
                height={20}
                className="rounded-full grayscale"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Idle EN Icon on the right (shown when TR is active) */}
      <div className="absolute right-1 top-1 w-8 h-8 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {!isEn && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={idleVariants}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/americaflag.png"
                alt="English Idle"
                width={20}
                height={20}
                className="rounded-full grayscale"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumb */}
      <motion.div
        className="absolute left-1 top-1 w-8 h-8 rounded-full bg-white dark:bg-[#1a1a1a] shadow-sm flex items-center justify-center z-10 overflow-hidden border border-black/5 dark:border-white/10"
        animate={{ x: isEn ? 32 : 0 }}
        transition={springTransition}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={isEn}>
          <motion.div
            key={value}
            custom={isEn}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute flex items-center justify-center w-full h-full"
          >
            {isEn ? (
              <Image
                src="/americaflag.png"
                alt="English"
                width={24}
                height={24}
                className="rounded-full w-6 h-6 object-cover"
              />
            ) : (
              <Image
                src="/turkishflag.png"
                alt="Turkish"
                width={24}
                height={24}
                className="rounded-full w-6 h-6 object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
