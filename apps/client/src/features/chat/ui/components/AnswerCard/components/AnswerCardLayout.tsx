import type { ComponentPropsWithoutRef } from 'react';

export const AnswerCardLayout = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className="my-2 flex flex-col gap-4 rounded border border-alternate/40 bg-dark/60 p-4"
    {...props}
  >
    {children}
  </div>
);
