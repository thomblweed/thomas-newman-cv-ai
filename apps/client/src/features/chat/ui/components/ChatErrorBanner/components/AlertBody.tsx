import type { ComponentPropsWithoutRef } from 'react';

export const AlertBody = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className="flex min-w-0 flex-1 flex-col gap-3" {...props}>
    {children}
  </div>
);
