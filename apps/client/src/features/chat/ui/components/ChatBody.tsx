'use client';

import type { ReactNode } from 'react';

type ChatBodyProps = {
  children: ReactNode;
};

export const ChatBody = ({ children }: ChatBodyProps) => (
  <div className="flex min-h-0 flex-1 flex-col gap-3">
    {children}
  </div>
);
