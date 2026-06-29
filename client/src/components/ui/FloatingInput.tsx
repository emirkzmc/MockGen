import React, { forwardRef } from 'react';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, id, className = '', ...props }, ref) => {
    const generatedId = id || label.replace(/\s+/g, '-').toLowerCase();

    const [isFilled, setIsFilled] = React.useState(false);

    return (
      <div className={`relative w-86.25 h-10.5 ${className}`}>
        <input
          id={generatedId}
          ref={ref}
          placeholder=" "
          className="peer w-full h-full bg-white border border-[#a4a4a4] px-3 pt-3.5 pb-1 text-black outline-none focus:border-black transition-colors rounded-md"
          onChange={(e) => {
            setIsFilled(e.target.value.length > 0);
            props.onChange?.(e);
          }}
          {...props}
        />

        <label
          htmlFor={generatedId}
          className={`
            absolute left-3 transition-all pointer-events-none
            text-black text-sm top-1/2 -translate-y-1/2
            peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-[#7D7D7D]
            ${isFilled ? 'top-2.5 text-[10px] text-[#7D7D7D]' : ''}
          `}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';