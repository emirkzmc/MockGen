import React, { forwardRef } from 'react';
import Link from 'next/link';

interface PanelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}

export const PanelButton = forwardRef<HTMLButtonElement, PanelButtonProps>(
  ({ icon, children, href, className = '', ...props }, ref) => {
    const classes = `inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-transparent border border-[#630102] text-[#260F09] dark:text-[#EDEBDE] text-sm hover:bg-[#630102]/10 transition-colors disabled:opacity-50 tracking-wide cursor-pointer ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {icon}
          <span>{children}</span>
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {icon}
        <span>{children}</span>
      </button>
    );
  }
);

PanelButton.displayName = 'PanelButton';
