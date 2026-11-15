import { useMemo } from 'react';

import { parseRoleContent } from '../../../../utils/parseRoleContent';

import { AnswerCardLayout } from './AnswerCardLayout';
import { AnswerCounts } from './AnswerCounts';
import { AnswerDisclosure } from './AnswerDisclosure';
import { AnswerIdentity } from './AnswerIdentity';
import { AnswerSection } from './AnswerSection';
import { TechStack } from './TechStack';

import type { Role } from '../../../../interfaces/role.interface';

type Props = {
  role: Role;
};

export const CompactAnswerCard = ({ role }: Props) => {
  const { responsibilities, achievements } = useMemo(
    () => parseRoleContent(role.content),
    [role.content]
  );

  const hasRows = responsibilities.length > 0 || achievements.length > 0;

  return (
    <AnswerCardLayout>
      <AnswerIdentity role={role} />
      <TechStack slugs={role.tech_stack} />
      <AnswerCounts
        responsibilities={responsibilities.length}
        achievements={achievements.length}
      />
      {hasRows ? (
        <AnswerDisclosure>
          <AnswerSection title="Responsibilities" rows={responsibilities} />
          <AnswerSection title="Key Achievements" rows={achievements} />
        </AnswerDisclosure>
      ) : null}
    </AnswerCardLayout>
  );
};
