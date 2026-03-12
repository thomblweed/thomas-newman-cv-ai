'use client';

import { useState } from 'react';

import type { ReactNode } from 'react';

type DisclosureProps = {
  summary: ReactNode;
  children: ReactNode;
};

export const Disclosure = ({ summary, children }: DisclosureProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <span>{summary}</span>
        <button
          type="button"
          className="cursor-pointer ml-1 text-primary underline-offset-2 hover:underline"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-expanded={isOpen}
        >
          {isOpen ? 'Show less' : 'Read more'}
        </button>
      </div>
      {isOpen ? <div>{children}</div> : null}
    </div>
  );
};
