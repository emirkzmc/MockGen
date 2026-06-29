import React, { forwardRef } from 'react';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, id, className = '', error, ...props }, ref) => {
    const generatedId = id || label.replace(/\s+/g, '-').toLowerCase();

    const [isFilled, setIsFilled] = React.useState(false);

    return (
      <div className={`w-86.25 ${className}`}>
        <div className="relative h-10.5 w-full">
          <input
            id={generatedId}
            ref={ref}
            placeholder=" "
            className={`peer w-full h-full bg-white border ${
              error ? 'border-red-500 focus:border-red-600' : 'border-[#a4a4a4] focus:border-black'
            } px-3 pt-3.5 pb-1 text-black outline-none transition-colors rounded-md`}
            {...props}
            onChange={(e) => {
              setIsFilled(e.target.value.length > 0);
              props.onChange?.(e);
            }}
          />

        <label
          htmlFor={generatedId}
          className={`
            absolute left-3 transition-all pointer-events-none
            text-black text-sm top-1/2 -translate-y-1/2
            peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:text-[#7D7D7D]
            ${isFilled ? 'top-2.5 text-[10px] text-[#7D7D7D]' : ''}
          `}
        >
          {label}
        </label>
        </div>
        {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
      </div>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';