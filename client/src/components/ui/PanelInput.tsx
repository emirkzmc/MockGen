import React, { forwardRef } from 'react';

interface PanelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PanelInput = forwardRef<HTMLInputElement, PanelInputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 bg-transparent border-b border-black/20 dark:border-white/20 text-black dark:text-white focus:outline-none focus:border-[#810100] transition-colors font-light placeholder:text-black/20 dark:placeholder:text-white/20 ${className}`}
        {...props}
      />
    );
  }
);

PanelInput.displayName = 'PanelInput';
