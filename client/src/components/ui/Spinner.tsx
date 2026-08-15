import React from 'react';

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Spinner = ({ size = 'md', className = '', ...props }: SpinnerProps) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <svg 
      className={`animate-spin ${sizeMap[size]} ${className}`} 
      viewBox="0 0 50 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle 
        cx="25" cy="25" r="20" 
        stroke="currentColor" 
        strokeWidth="5" 
        strokeLinecap="round" 
        className="opacity-20" 
      />
      <path 
        d="M25 5 A20 20 0 0 1 45 25" 
        stroke="currentColor" 
        strokeWidth="5" 
        strokeLinecap="round" 
        className="opacity-80" 
      />
    </svg>
  );
};
