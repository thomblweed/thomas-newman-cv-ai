import type { ComponentPropsWithoutRef } from 'react';

export const AlertMessages = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className="flex flex-col gap-1" {...props}>
    {children}
  </div>
);
