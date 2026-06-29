import React, { forwardRef } from 'react';

interface PanelSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string; className?: string }[];
}

export const PanelSelect = forwardRef<HTMLSelectElement, PanelSelectProps>(
  ({ options, className = '', ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full px-4 py-3 bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-[#810100] transition-colors appearance-none font-light ${className}`}
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value} className={`bg-[#260F09] ${opt.className || ''}`}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);

PanelSelect.displayName = 'PanelSelect';
