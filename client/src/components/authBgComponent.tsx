import React from 'react';

export function AuthBgComponents() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute right-[-20%] top-[-10%] w-250 h-250 bg-[#630102] rounded-full blur-[200px] opacity-80" />
      <div className="absolute right-[-10%] top-[10%] w-175 h-175 bg-[#810100] rounded-full blur-[150px] opacity-90" />
      <div className="absolute right-[5%] top-[25%] w-100 h-100 bg-[#EDEBDE]/40 rounded-full blur-[100px] opacity-80" />
    </div>
  );
}
