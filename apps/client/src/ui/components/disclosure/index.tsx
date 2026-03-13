'use client';

import { useState } from 'react';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type DisclosureProps = {
  summary: ReactNode;
  children: ReactNode;
};

export const Disclosure = ({ summary, children }: DisclosureProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <div>
      <button
        type="button"
        className="flex w-full items-start justify-between gap-2 text-left"
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <div className="flex-1">{summary}</div>
        <span
          className={cn(
            'mt-0.5 inline-flex h-4 w-4 items-center justify-center text-primary transition-transform',
            isOpen && 'rotate-90'
          )}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3 w-3"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M5 3l5 5-5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {isOpen ? <div className="mt-2">{children}</div> : null}
    </div>
  );
};
