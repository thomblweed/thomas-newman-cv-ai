type Props = {
  responsibilities: number;
  achievements: number;
  technologies?: number;
  period?: string;
};

const countLabel = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

export const AnswerCounts = ({
  responsibilities,
  achievements,
  technologies = 0,
  period
}: Props) => {
  const counts = [
    period ?? null,
    technologies > 0
      ? countLabel(technologies, 'technology', 'technologies')
      : null,
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
