'use client';

import type { ReactNode } from 'react';

type ChatSectionProps = {
  children: ReactNode;
};

export const ChatSection = ({ children }: ChatSectionProps) => (
  <section className="flex min-h-0 flex-1 flex-col gap-4 rounded bg-dark/60 p-4">
    {children}
  </section>
);
