import type { ComponentType } from 'react';

type Props = {
  label: string;
  Icon?: ComponentType<{ className?: string }>;
};

export const TechChip = ({ label, Icon }: Props) => (
  <li className="flex items-center gap-1.5 rounded-full border border-alternate/40 bg-dark/60 px-2.5 py-1 text-xs text-grey">
    {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
    <span>{label}</span>
  </li>
);
