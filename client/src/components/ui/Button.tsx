import React from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = ({ children, className = '', isLoading, disabled, ...props }: ButtonProps) => {
  return (
    <button 
      className={`w-full md:w-86.25 h-9 flex justify-center items-center gap-2 cursor-pointer bg-[#BABABA]/55 border border-[#a4a4a4] text-black font-semibold rounded-md transition-all duration-300 mt-2 hover:scale-105 hover:bg-[#BABABA]/70 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="text-black" />}
      {children}
    </button>
  );
};
