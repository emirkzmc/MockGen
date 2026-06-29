import React, { forwardRef } from 'react';

interface PanelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PanelInput = forwardRef<HTMLInputElement, PanelInputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-[#810100] transition-colors font-light placeholder:text-white/20 ${className}`}
        {...props}
      />
    );
  }
);

PanelInput.displayName = 'PanelInput';
