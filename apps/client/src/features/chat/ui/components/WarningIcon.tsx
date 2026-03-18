import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const WarningIcon = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'svg'>) => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
    className={cn('text-primary', className)}
    {...props}
  >
    <path
      d="M8 2 L15 14 H1 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M8 6.5 v3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="12" r="0.75" fill="currentColor" />
  </svg>
);
