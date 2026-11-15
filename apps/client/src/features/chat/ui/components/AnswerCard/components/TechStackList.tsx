import type { ComponentPropsWithoutRef } from 'react';

export const TechStackList = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'ul'>) => (
  <ul className="flex flex-wrap gap-2" {...props}>
    {children}
  </ul>
);
