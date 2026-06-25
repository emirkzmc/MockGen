"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const TrackingEye = () => {
  const eyeRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const irisX = useTransform(smoothX, [-1, 1], [-100, 100]);
  const irisY = useTransform(smoothY, [-1, 1], [-120, 120]);

  const pupilX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const pupilY = useTransform(smoothY, [-1, 1], [-60, 60]);

  const shineX = useTransform(smoothX, [-1, 1], [10, -10]);
  const shineY = useTransform(smoothY, [-1, 1], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const limitX = window.innerWidth / 2;
      const limitY = window.innerHeight / 2;
      
      mouseX.set(Math.max(-1, Math.min(1, distanceX / limitX)));
      mouseY.set(Math.max(-1, Math.min(1, distanceY / limitY)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="w-1/2 h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        ref={eyeRef}
        className="w-full h-full rounded-[50%] flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #b3b3b3 0%, #999999 60%, #666666 100%)',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)',
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none rounded-[50%]" 
          style={{
            boxShadow: 'inset 0 20px 50px rgba(0,0,0,0.5), inset 0 -10px 40px rgba(0,0,0,0.3)'
          }}
        />

        <motion.div 
          className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full flex items-center justify-center absolute shadow-2xl"
          style={{
            x: irisX, 
            y: irisY,
            background: 'radial-gradient(circle at 50% 50%, #8a8a8a 0%, #6B6B6B 50%, #3d3d3d 90%, #1a1a1a 100%)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          <motion.div 
            className="w-[120px] h-[120px] lg:w-[160px] lg:h-[160px] rounded-full absolute"
            style={{
              x: pupilX, 
              y: pupilY,
              background: '#222222',
              boxShadow: 'inset 0 0 15px #000'
            }}
          >
            <motion.div
              className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-full bg-white opacity-80 absolute top-4 left-4"
              style={{
                x: shineX,
                y: shineY,
                filter: 'blur(2px)',
                boxShadow: '0 0 15px rgba(255,255,255,0.8)'
              }}
            />
            <motion.div
              className="w-[10px] h-[10px] lg:w-[15px] lg:h-[15px] rounded-full bg-white opacity-40 absolute top-12 left-14"
              style={{
                x: shineX,
                y: shineY,
                filter: 'blur(1px)'
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
