"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const FONTS = [
  'var(--font-poppins)', 
  'serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  '"Impact", fantasy',
  '"Georgia", serif',
];

export function AnimatedLabel() {
  const [fontIndex, setFontIndex] = useState(0);
  const [phase, setPhase] = useState<'flicker' | 'final'>('flicker');

  const indexRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== 'flicker') return;

    const startTime = performance.now();
    const duration = 2000;
    const totalChanges = 2 * FONTS.length;

    const loop = (time: number) => {
      const elapsed = time - startTime;
      
      if (elapsed >= duration) {
        setPhase('final');
        return;
      }

      const progress = elapsed / duration;
      const currentChange = Math.floor(progress * totalChanges);
      
      if (currentChange !== indexRef.current) {
        indexRef.current = currentChange;
        setFontIndex(currentChange % FONTS.length);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  return (
    <a href="/" className="relative flex items-center group cursor-pointer pointer-events-auto">
      <AnimatePresence>
        {phase === 'flicker' && (
          <motion.div
            key="flicker"
            className="text-8xl font-bold leading-none will-change-transform absolute right-0 whitespace-nowrap"
            style={{ fontFamily: FONTS[fontIndex] }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            MOCKGEN
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {phase === 'final' && (
          <motion.div
            key="final"
            className="text-8xl font-bold leading-none will-change-transform absolute right-0 origin-right whitespace-nowrap group-hover:text-white/60 transition-colors duration-300"
            style={{ fontFamily: 'var(--font-poppins)' }}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            MOCKGEN
          </motion.div>
        )}
      </AnimatePresence>
      <div 
        className="text-8xl font-bold leading-none opacity-0 pointer-events-none whitespace-nowrap"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        MOCKGEN
      </div>
    </a>
  );
}