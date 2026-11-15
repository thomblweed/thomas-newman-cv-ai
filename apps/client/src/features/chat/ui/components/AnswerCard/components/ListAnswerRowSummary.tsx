import { useMemo } from 'react';

import { parseRoleContent } from '../../../../utils/parseRoleContent';
import { formatRoleDuration } from '../../../utils/formatRoleDuration';
import { resolveTechStack } from '../../../utils/tech-stack';

import { AnswerCounts } from './AnswerCounts';
import { TechStackList } from './TechStackList';
import { TechChip } from './TechChip';

import type { Role } from '../../../../interfaces/role.interface';
import type { SectionsHint } from '../../../utils/resolveAnswerCard';

type Props = {
  role: Role;
  sectionsHint: SectionsHint | undefined;
  techFilter: string[];
};

// The collapsed row answers the question asked: it surfaces only what the
// hint is about, so a list of Roles is more than company names and dates.
export const ListAnswerRowSummary = ({
  role,
  sectionsHint,
  techFilter
}: Props) => {
  const { responsibilities, achievements } = useMemo(
    () => parseRoleContent(role.content),
    [role.content]
  );

  if (!sectionsHint) return null;

  const matchingTech = resolveTechStack(
    (role.tech_stack ?? []).filter((slug) =>
      techFilter.includes(slug.toLowerCase())
    )
  );
  const aboutTech = sectionsHint.includes('tech');

  return (
    <>
      {aboutTech && matchingTech.length > 0 ? (
        <TechStackList>
          {matchingTech.map(({ slug, label, Icon }) => (
            <TechChip key={slug} label={label} Icon={Icon} />
          ))}
        </TechStackList>
      ) : null}
      <AnswerCounts
        technologies={
          aboutTech && matchingTech.length === 0
            ? (role.tech_stack?.length ?? 0)
            : 0
        }
        responsibilities={
          sectionsHint.includes('responsibilities')
            ? responsibilities.length
            : 0
        }
        achievements={
          sectionsHint.includes('achievements') ? achievements.length : 0
        }
        period={
          sectionsHint.includes('period')
            ? formatRoleDuration(role.duration_months)
            : undefined
        }
      />
    </>
  );
};
