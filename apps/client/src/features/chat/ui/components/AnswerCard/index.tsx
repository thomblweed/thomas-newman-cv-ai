import { resolveAnswerCard } from '../../utils/resolveAnswerCard';

import { CompactAnswerCard } from './components/CompactAnswerCard';
import { FullAnswerCard } from './components/FullAnswerCard';

import type { Role } from '../../../interfaces/role.interface';
import type { SectionsHint } from '../../utils/resolveAnswerCard';

type Props = {
  role: Role;
  sectionsHint: SectionsHint | undefined;
  roleCount: number;
};

export const AnswerCard = ({ role, sectionsHint, roleCount }: Props) => {
  const { variant, sections } = resolveAnswerCard(
    role,
    sectionsHint,
    roleCount
  );

  if (variant === 'none') return null;
  if (variant === 'compact') return <CompactAnswerCard role={role} />;

  return <FullAnswerCard role={role} sections={sections} />;
};
