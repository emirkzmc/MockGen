"use client";
import React, { useEffect, useRef, useState } from "react";

const FONTS = [
  'var(--font-poppins)', 
  'serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  '"Impact", fantasy',
  '"Georgia", serif',
  '"Courier New", monospace',
  '"Trebuchet MS", sans-serif',
  '"Arial Black", sans-serif',
  '"Comic Sans MS", cursive'
];

export function AnimatedLabel() {
  const [fontIndex, setFontIndex] = useState(0);

  const indexRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = (time: number) => {
      if (time - lastUpdateRef.current > 250) {
        indexRef.current = (indexRef.current + 1) % FONTS.length;
        lastUpdateRef.current = time;

        setFontIndex(indexRef.current);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="text-[96px] font-bold leading-none will-change-transform"
      style={{ fontFamily: FONTS[fontIndex] }}
    >
      MOCKGEN
    </div>
  );
}