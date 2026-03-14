import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';


type Props = {
  variant: 'assistant' | 'user';
  children: ReactNode;
};

export const MessageBubble = ({ variant, children }: Props) => (
  <div
    className={cn(
      'flex w-full',
      variant === 'assistant' ? 'justify-start' : 'justify-end'
    )}
  >
    <div
      className={cn(
        'max-w-[80%] rounded px-4 py-4 text-base',
        variant === 'assistant'
          ? 'bg-dark/80 text-grey'
          : 'bg-primary text-dark'
      )}
    >
      {children}
    </div>
  </div>
);
