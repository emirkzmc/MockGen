import React, { forwardRef } from 'react';
import Link from 'next/link';

interface PanelIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'default' | 'danger';
  href?: string;
}

export const PanelIconButton = forwardRef<HTMLButtonElement, PanelIconButtonProps>(
  ({ icon, variant = 'default', href, className = '', ...props }, ref) => {
    const baseClass = "transition-colors disabled:opacity-50 cursor-pointer";
    const variantClass = variant === 'danger' 
      ? "text-white/40 hover:text-red-400" 
      : "text-white/40 hover:text-white";

    const classes = `${baseClass} ${variantClass} ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {icon}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {icon}
      </button>
    );
  }
);

PanelIconButton.displayName = 'PanelIconButton';
