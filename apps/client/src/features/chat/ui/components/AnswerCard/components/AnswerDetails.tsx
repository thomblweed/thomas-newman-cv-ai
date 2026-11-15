import { useMemo } from 'react';

import { parseRoleContent } from '../../../../utils/parseRoleContent';
import { formatRoleDuration } from '../../../utils/formatRoleDuration';
import { formatRolePeriod } from '../../../utils/formatRolePeriod';

import { AnswerSection } from './AnswerSection';
import { TechStack } from './TechStack';

import type { Role } from '../../../../interfaces/role.interface';
import type { AnswerSection as AnswerSectionName } from '../../../utils/resolveAnswerCard';

type Props = {
  role: Role;
  sections: AnswerSectionName[];
  period?: boolean;
};

export const AnswerDetails = ({ role, sections, period }: Props) => {
  const { responsibilities, achievements } = useMemo(
    () => parseRoleContent(role.content),
    [role.content]
  );

  return (
    <>
      {sections.includes('tech') ? <TechStack slugs={role.tech_stack} /> : null}
      {period ? (
        <AnswerSection
          title="Period"
          rows={[
            {
              title: formatRolePeriod(role.period_start, role.period_end),
              detail: formatRoleDuration(role.duration_months)
            }
          ]}
        />
      ) : null}
      {sections.includes('responsibilities') ? (
        <AnswerSection title="Responsibilities" rows={responsibilities} />
      ) : null}
      {sections.includes('achievements') ? (
        <AnswerSection title="Key Achievements" rows={achievements} />
      ) : null}
    </>
  );
};
