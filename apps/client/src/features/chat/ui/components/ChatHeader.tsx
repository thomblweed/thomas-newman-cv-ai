'use client';

import type { ReactNode } from 'react';

type ChatHeaderProps = {
  children: ReactNode;
};

export const ChatHeader = ({ children }: ChatHeaderProps) => (
  <header className="flex items-center justify-between gap-4 border-b border-primary/40 pb-4">
    {children}
  </header>
);
