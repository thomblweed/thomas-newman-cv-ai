import { AnswerCardLayout } from './AnswerCardLayout';
import { AnswerDetails } from './AnswerDetails';
import { AnswerIdentity } from './AnswerIdentity';

import type { Role } from '../../../../interfaces/role.interface';
import type { AnswerSection as AnswerSectionName } from '../../../utils/resolveAnswerCard';

type Props = {
  role: Role;
  sections: AnswerSectionName[];
  period?: boolean;
};

export const FullAnswerCard = ({ role, sections, period }: Props) => (
  <AnswerCardLayout>
    <AnswerIdentity role={role} />
    <AnswerDetails role={role} sections={sections} period={period} />
  </AnswerCardLayout>
);
