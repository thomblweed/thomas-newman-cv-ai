type Props = {
  title: string;
  detail: string;
};

export const AnswerRow = ({ title, detail }: Props) => (
  <li className="flex flex-col gap-0.5">
    <p className="font-medium text-bright">{title}</p>
    {detail ? <p className="text-sm text-grey/90">{detail}</p> : null}
  </li>
);
