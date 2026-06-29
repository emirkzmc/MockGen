import React, { forwardRef } from 'react';
import Link from 'next/link';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

interface PanelIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'default' | 'danger';
  href?: string;
}

export const PanelIconButton = forwardRef<HTMLButtonElement, PanelIconButtonProps>(
  ({ icon, variant = 'default', href, className = '', title, ...props }, ref) => {
    const baseClass = "transition-colors disabled:opacity-50 cursor-pointer";
    const variantClass = variant === 'danger' 
      ? "text-black/40 dark:text-white/40 hover:text-red-500 dark:hover:text-red-400" 
      : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white";

    const classes = `${baseClass} ${variantClass} ${className}`;

    const content = href ? (
      <Link href={href} className={classes}>
        {icon}
      </Link>
    ) : (
      <button ref={ref} className={classes} {...props}>
        {icon}
      </button>
    );

    if (title) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  }
);

PanelIconButton.displayName = 'PanelIconButton';
