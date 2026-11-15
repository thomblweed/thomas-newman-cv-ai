import { AnswerRow } from './AnswerRow';

import type { AnswerRowData } from '../../../../utils/parseRoleContent';

type Props = {
  title: string;
  rows: AnswerRowData[];
};

export const AnswerSection = ({ title, rows }: Props) => {
  if (rows.length === 0) return null;

  return (
    <section className="flex flex-col gap-2">
      <h4 className="text-xs font-semibold tracking-wide text-primary uppercase">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {rows.map((row) => (
          <AnswerRow key={row.title} title={row.title} detail={row.detail} />
        ))}
      </ul>
    </section>
  );
};
