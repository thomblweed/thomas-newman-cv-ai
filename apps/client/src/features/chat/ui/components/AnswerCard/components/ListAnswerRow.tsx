import { AnswerIdentity } from './AnswerIdentity';
import { ListAnswerRowSummary } from './ListAnswerRowSummary';

import type { Role } from '../../../../interfaces/role.interface';
import type { SectionsHint } from '../../../utils/resolveAnswerCard';

type Props = {
  role: Role;
  sectionsHint: SectionsHint | undefined;
  techFilter: string[];
};

export const ListAnswerRow = ({ role, sectionsHint, techFilter }: Props) => (
  <li className="flex flex-col gap-1">
    <AnswerIdentity role={role} />
    <ListAnswerRowSummary
      role={role}
      sectionsHint={sectionsHint}
      techFilter={techFilter}
    />
  </li>
);
