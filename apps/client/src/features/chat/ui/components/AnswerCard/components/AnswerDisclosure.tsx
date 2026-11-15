import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const AnswerDisclosure = ({ children }: Props) => (
  <details className="flex flex-col gap-2">
    <summary className="cursor-pointer text-xs font-semibold tracking-wide text-primary uppercase">
      Show details
    </summary>
    <div className="flex flex-col gap-4 pt-2">{children}</div>
  </details>
);
