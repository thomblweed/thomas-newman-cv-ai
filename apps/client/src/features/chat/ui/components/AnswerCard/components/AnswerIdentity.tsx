import { formatRolePeriod } from '../../../utils/formatRolePeriod';

import type { Role } from '../../../../interfaces/role.interface';

type Props = {
  role: Role;
};

export const AnswerIdentity = ({ role }: Props) => (
  <header className="flex flex-col gap-0.5">
    <p className="font-semibold text-bright">
      {role.client ? `${role.company} — ${role.client}` : role.company}
    </p>
    <p className="text-sm text-grey/90">
      {role.title} · {formatRolePeriod(role.period_start, role.period_end)}
    </p>
  </header>
);
