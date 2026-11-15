import { AnswerCardLayout } from './AnswerCardLayout';
import { AnswerRowList } from './AnswerRowList';
import { ListAnswerRow } from './ListAnswerRow';

import type { Role } from '../../../../interfaces/role.interface';
import type { SectionsHint } from '../../../utils/resolveAnswerCard';

type Props = {
  roles: Role[];
  sectionsHint?: SectionsHint;
  techFilter?: string[];
};

export const ListAnswerCard = ({
  roles,
  sectionsHint,
  techFilter = []
}: Props) => (
  <AnswerCardLayout>
    <AnswerRowList>
      {roles.map((role) => (
        <ListAnswerRow
          key={`${role.company}-${role.period_start}`}
          role={role}
          sectionsHint={sectionsHint}
          techFilter={techFilter}
        />
      ))}
    </AnswerRowList>
  </AnswerCardLayout>
);
