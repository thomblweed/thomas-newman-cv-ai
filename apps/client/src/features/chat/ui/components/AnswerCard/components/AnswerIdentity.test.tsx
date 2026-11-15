import { render, screen } from '@testing-library/react';

import { AnswerIdentity } from './AnswerIdentity';

import type { Role } from '../../../../interfaces/role.interface';

const makeRole = (overrides: Partial<Role> = {}): Role => ({
  type: 'role',
  company: 'Slice',
  title: 'Senior Frontend Engineer',
  period_start: '2025-07',
  period_end: '2026-05',
  duration_months: 10,
  employment_type: 'full-time',
  content: '# Senior Frontend Engineer at Slice',
  ...overrides
});

it('should render the company verbatim when there is no client', () => {
  render(<AnswerIdentity role={makeRole()} />);

  expect(screen.getByText('Slice')).toBeInTheDocument();
});

it('should append the client to the company when one exists', () => {
  render(
    <AnswerIdentity
      role={makeRole({
        company: 'Buildit | Wipro Digital',
        client: 'Lloyds Bank'
      })}
    />
  );

  expect(
    screen.getByText('Buildit | Wipro Digital — Lloyds Bank')
  ).toBeInTheDocument();
});

it('should render the title and the closed period on the meta line', () => {
  render(<AnswerIdentity role={makeRole()} />);

  expect(
    screen.getByText('Senior Frontend Engineer · Jul 2025 – May 2026')
  ).toBeInTheDocument();
});

it('should render an ongoing period as since', () => {
  render(<AnswerIdentity role={makeRole({ period_end: undefined })} />);

  expect(
    screen.getByText(/Senior Frontend Engineer · since Jul 2025/)
  ).toBeInTheDocument();
});
