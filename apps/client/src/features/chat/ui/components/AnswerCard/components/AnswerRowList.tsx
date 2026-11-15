import type { ComponentPropsWithoutRef } from 'react';

export const AnswerRowList = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'ul'>) => (
  <ul className="flex flex-col gap-2" {...props}>
    {children}
  </ul>
);
