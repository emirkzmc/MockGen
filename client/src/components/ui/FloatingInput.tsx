import React, { forwardRef } from 'react';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, id, className = '', ...props }, ref) => {
    const generatedId = id || label.replace(/\s+/g, '-').toLowerCase();

    return (
      <div className={`relative w-86.25 h-10.5 ${className}`}>
        <input
          id={generatedId}
          ref={ref}
          placeholder=" "
          className="peer w-full h-full bg-[#BABABA]/55 border border-[#a4a4a4] px-3 pt-3.5 pb-1 text-black outline-none focus:border-black transition-colors rounded-md"
          {...props}
        />
        <label
          htmlFor={generatedId}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8D8D8D] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-[#7D7D7D] pointer-events-none"
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';
