type Props = {
  responsibilities: number;
  achievements: number;
};

const countLabel = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

export const AnswerCounts = ({ responsibilities, achievements }: Props) => {
  const counts = [
    responsibilities > 0
      ? countLabel(responsibilities, 'responsibility', 'responsibilities')
      : null,
    achievements > 0
      ? countLabel(achievements, 'achievement', 'achievements')
      : null
  ].filter((count): count is string => count !== null);

  if (counts.length === 0) return null;

  return <p className="text-sm text-grey/90">{counts.join(' · ')}</p>;
};
