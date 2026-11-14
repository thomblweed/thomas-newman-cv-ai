import type { ComponentPropsWithoutRef, Ref } from 'react';

import { cn } from '@/lib/utils';

const inputClasses = [
  'w-full',
  'text-grey',
  'rounded',
  'border',
  'border-primary',
  'outline-2',
  'outline-transparent',
  'outline-offset-2',
  'bg-inherit',
  'p-4',
  'h-11',
  'md:h-12',
  'transition-[box-shadow,border-color]',
  'hover:enabled:border-grey',
  'hover:enabled:shadow-focus-glow',
  'focus:enabled:border-grey',
  'focus:enabled:shadow-focus-glow',
  'disabled:cursor-not-allowed',
  'disabled:opacity-30',
  'disabled:bg-grey',
  'disabled:text-alternate'
];

type InputProps = {
  className?: string;
  ref?: Ref<HTMLInputElement>;
} & ComponentPropsWithoutRef<'input'>;

export const Input = ({ className, ref, ...props }: InputProps) => (
  <input ref={ref} className={cn(inputClasses, className)} {...props} />
);
