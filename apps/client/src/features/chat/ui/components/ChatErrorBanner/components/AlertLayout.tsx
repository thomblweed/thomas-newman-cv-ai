import type { ComponentPropsWithoutRef } from 'react';

export const AlertLayout = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    role="alert"
    aria-live="assertive"
    className="flex items-start gap-3 rounded border border-alternate/40 bg-dark px-4 py-3 text-sm text-grey shadow-focus-glow"
    {...props}
  >
    {children}
  </div>
);
