import { render, screen } from '@testing-library/react';

import { FullAnswerCard } from './FullAnswerCard';

import type { Role } from '../../../../interfaces/role.interface';

const role: Role = {
  type: 'role',
  company: 'Slice',
  title: 'Senior Frontend Engineer',
  period_start: '2025-07',
  period_end: '2026-05',
  duration_months: 10,
  employment_type: 'full-time',
  tech_stack: ['react', 'typescript', 'docker'],
  content: `# Senior Frontend Engineer at Slice

## Company Context

A short paragraph.

## Responsibilities

### Feature Delivery

Delivering new features for a menu building system

### Team Support

Supporting junior engineers on the team

## Key Achievements

### Code Quality & Architecture

Improved sections of the codebase for scalability
`
};

it('should render a chip for each technology in the role tech stack', () => {
  render(
    <FullAnswerCard
      role={role}
      sections={['tech', 'responsibilities', 'achievements']}
    />
  );

  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('TypeScript')).toBeInTheDocument();
  expect(screen.getByText('Docker')).toBeInTheDocument();
});

it('should render each responsibility and achievement with its detail', () => {
  render(
    <FullAnswerCard
      role={role}
      sections={['tech', 'responsibilities', 'achievements']}
    />
  );

  expect(screen.getByText('Feature Delivery')).toBeInTheDocument();
  expect(
    screen.getByText('Delivering new features for a menu building system')
  ).toBeInTheDocument();
  expect(screen.getByText('Code Quality & Architecture')).toBeInTheDocument();
});

it('should render the responsibilities and achievements sections open', () => {
  render(
    <FullAnswerCard
      role={role}
      sections={['tech', 'responsibilities', 'achievements']}
    />
  );

  expect(
    screen.getByRole('heading', { name: 'Responsibilities' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Key Achievements' })
  ).toBeInTheDocument();
  expect(screen.queryByRole('group')).not.toBeInTheDocument();
});

it('should omit the tech stack when the tech section is not requested', () => {
  render(<FullAnswerCard role={role} sections={['responsibilities']} />);

  expect(screen.queryByText('React')).not.toBeInTheDocument();
  expect(screen.queryByText('Docker')).not.toBeInTheDocument();
});

it('should omit the achievements section when it is not requested', () => {
  render(<FullAnswerCard role={role} sections={['responsibilities']} />);

  expect(
    screen.queryByRole('heading', { name: 'Key Achievements' })
  ).not.toBeInTheDocument();
});
