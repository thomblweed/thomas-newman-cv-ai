import { render, screen } from '@testing-library/react';

import { CompactAnswerCard } from './CompactAnswerCard';

import type { Role } from '../../../../interfaces/role.interface';

const role: Role = {
  type: 'role',
  company: 'Slice',
  title: 'Senior Frontend Engineer',
  period_start: '2025-07',
  period_end: '2026-05',
  duration_months: 10,
  employment_type: 'full-time',
  tech_stack: ['react', 'typescript'],
  content: `## Responsibilities

### Feature Delivery

Delivering new features

### Team Support

Supporting junior engineers

## Key Achievements

### Code Quality

Improved the codebase
`
};

it('should render the role identity and its tech chips', () => {
  render(<CompactAnswerCard role={role} />);

  expect(screen.getByText('Slice')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('TypeScript')).toBeInTheDocument();
});

it('should render a count line derived from the parsed sections', () => {
  render(<CompactAnswerCard role={role} />);

  expect(
    screen.getByText('2 responsibilities · 1 achievement')
  ).toBeInTheDocument();
});

it('should hide the sections behind a collapsed disclosure', () => {
  render(<CompactAnswerCard role={role} />);

  const disclosure = screen.getByRole('group') as HTMLDetailsElement;

  expect(disclosure.open).toBe(false);
  expect(screen.getByText('Show details')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Responsibilities' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Key Achievements' })
  ).toBeInTheDocument();
});

it('should not render a disclosure when the role has no rows', () => {
  render(
    <CompactAnswerCard role={{ ...role, content: '# A role with no lists' }} />
  );

  expect(screen.queryByRole('group')).not.toBeInTheDocument();
});
