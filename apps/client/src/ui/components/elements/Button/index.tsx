import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'cursor-pointer',
    'px-6 py-2',
    'text-dark',
    'border border-primary',
    'bg-primary',
    'rounded',
    'font-bold',
    'text-base',
    'h-12',
    'transition-all',
    'hover:enabled:text-alternate',
    'hover:enabled:bg-grey',
    'hover:enabled:shadow-focus-glow',
    'hover:enabled:text-shadow-(--text-shadow-focus-glow)',
    'hover:enabled:outline-none',
    'focus:enabled:text-alternate',
    'focus:enabled:bg-grey',
    'focus:enabled:shadow-focus-glow',
    'focus:enabled:text-shadow-(--text-shadow-focus-glow)',
    'focus:enabled:outline-none',
    'disabled:bg-grey',
    'disabled:border-none',
    'disabled:text-alternate',
    'disabled:opacity-30',
    'disabled:cursor-not-allowed'
  ],
  {
    variants: {
      width: {
        full: 'w-full',
        normal: 'min-w-[85px]',
        none: 'w-10 h-10 p-0 rounded-sm leading-none'
      }
    },
    defaultVariants: {
      width: 'normal'
    }
  }
);

type ButtonProps = {
  className?: string;
} & VariantProps<typeof buttonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  width,
  className,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ width }), className)}
      {...rest}
    />
  );
};
