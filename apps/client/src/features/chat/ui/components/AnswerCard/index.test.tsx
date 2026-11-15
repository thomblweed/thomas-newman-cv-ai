import { render, screen } from '@testing-library/react';

import { AnswerCard } from './index';

import type { Role } from '../../../interfaces/role.interface';

const makeRole = (overrides: Partial<Role> = {}): Role => ({
  type: 'role',
  company: 'Slice',
  title: 'Senior Frontend Engineer',
  period_start: '2025-07',
  period_end: '2026-05',
  duration_months: 10,
  employment_type: 'full-time',
  tech_stack: ['react'],
  content: `## Responsibilities

### Feature Delivery

Delivering new features
`,
  ...overrides
});

it('should render a full card for a single role with no hint', () => {
  render(
    <AnswerCard role={makeRole()} sectionsHint={undefined} roleCount={1} />
  );

  expect(
    screen.getByRole('heading', { name: 'Responsibilities' })
  ).toBeInTheDocument();
  expect(screen.queryByRole('group')).not.toBeInTheDocument();
});

it('should render a compact card when several roles answer', () => {
  render(
    <AnswerCard role={makeRole()} sectionsHint={undefined} roleCount={3} />
  );

  expect(screen.getByRole('group')).toBeInTheDocument();
});

it('should render a full card limited to the hinted sections', () => {
  render(
    <AnswerCard
      role={makeRole()}
      sectionsHint={['responsibilities']}
      roleCount={3}
    />
  );

  expect(screen.queryByRole('group')).not.toBeInTheDocument();
  expect(screen.queryByText('React')).not.toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Responsibilities' })
  ).toBeInTheDocument();
});

it('should render nothing when the sections hint is empty', () => {
  const { container } = render(
    <AnswerCard role={makeRole()} sectionsHint={[]} roleCount={1} />
  );

  expect(container).toBeEmptyDOMElement();
});

it('should render nothing when the role has no content for the hinted sections', () => {
  const { container } = render(
    <AnswerCard
      role={makeRole({ content: '# A role with no lists', tech_stack: [] })}
      sectionsHint={['responsibilities']}
      roleCount={1}
    />
  );

  expect(container).toBeEmptyDOMElement();
});
