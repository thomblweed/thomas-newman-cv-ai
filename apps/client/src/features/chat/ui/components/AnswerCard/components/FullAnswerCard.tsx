import { useMemo } from 'react';

import { parseRoleContent } from '../../../../utils/parseRoleContent';

import { AnswerCardLayout } from './AnswerCardLayout';
import { AnswerIdentity } from './AnswerIdentity';
import { AnswerSection } from './AnswerSection';
import { TechStack } from './TechStack';

import type { Role } from '../../../../interfaces/role.interface';
import type { AnswerSection as AnswerSectionName } from '../../../utils/resolveAnswerCard';

type Props = {
  role: Role;
  sections: AnswerSectionName[];
};

export const FullAnswerCard = ({ role, sections }: Props) => {
  const { responsibilities, achievements } = useMemo(
    () => parseRoleContent(role.content),
    [role.content]
  );

  return (
    <AnswerCardLayout>
      <AnswerIdentity role={role} />
      {sections.includes('tech') ? <TechStack slugs={role.tech_stack} /> : null}
      {sections.includes('responsibilities') ? (
        <AnswerSection title="Responsibilities" rows={responsibilities} />
      ) : null}
      {sections.includes('achievements') ? (
        <AnswerSection title="Key Achievements" rows={achievements} />
      ) : null}
    </AnswerCardLayout>
  );
};
