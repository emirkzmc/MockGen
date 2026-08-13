import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button 
      className={`w-full md:w-86.25 h-9 cursor-pointer bg-[#BABABA]/55 border border-[#a4a4a4] text-black font-semibold rounded-md hover:scale-105  hover:bg-[#BABABA]/70 transition-all duration-300 mt-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
