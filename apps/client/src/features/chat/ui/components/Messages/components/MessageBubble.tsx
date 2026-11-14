import { cva } from 'class-variance-authority';

import type { ReactNode } from 'react';

const messageBubbleRowVariants = cva('flex w-full', {
  variants: {
    variant: {
      assistant: 'justify-start',
      user: 'justify-end'
    }
  }
});

const messageBubbleVariants = cva('max-w-[80%] rounded px-4 py-4 text-base', {
  variants: {
    variant: {
      assistant: 'bg-dark/80 text-grey',
      user: 'bg-primary text-dark'
    }
  }
});

type Props = {
  variant: 'assistant' | 'user';
  children: ReactNode;
};

export const MessageBubble = ({ variant, children }: Props) => (
  <div className={messageBubbleRowVariants({ variant })}>
    <div className={messageBubbleVariants({ variant })}>{children}</div>
  </div>
);
