import { render, screen } from '@testing-library/react';

import { ListAnswerCard } from './ListAnswerCard';

import type { Role } from '../../../../interfaces/role.interface';

const makeRole = (overrides: Partial<Role> = {}): Role => ({
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

### Testing

Writing tests

## Key Achievements

### Code Quality

Improved the codebase
`,
  ...overrides
});

describe('When rendering a list of roles', () => {
  it('should render one identity row per role', () => {
    render(
      <ListAnswerCard
        roles={[
          makeRole({ company: 'Slice' }),
          makeRole({
            company: 'Buildit | Wipro Digital',
            client: 'Lloyds Bank',
            period_start: '2020-07',
            period_end: '2021-05'
          })
        ]}
      />
    );

    expect(screen.getByText('Slice')).toBeInTheDocument();
    expect(
      screen.getByText('Buildit | Wipro Digital — Lloyds Bank')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Senior Frontend Engineer · Jul 2020 – May 2021')
    ).toBeInTheDocument();
  });

  it('should render an ongoing period as since', () => {
    render(
      <ListAnswerCard
        roles={[makeRole({ period_start: '2026-05', period_end: 'present' })]}
      />
    );

    expect(
      screen.getByText('Senior Frontend Engineer · since May 2026')
    ).toBeInTheDocument();
  });
});

describe('When rendering a row', () => {
  it('should not offer an expand control', () => {
    render(<ListAnswerCard roles={[makeRole()]} />);

    expect(screen.queryByRole('group')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Responsibilities' })
    ).not.toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
});

describe('When summarising a row', () => {
  it('should add no summary line without a hint', () => {
    render(<ListAnswerCard roles={[makeRole()]} />);

    expect(screen.queryByText(/achievement/)).not.toBeInTheDocument();
  });

  it('should show the achievement count for an achievements hint', () => {
    render(
      <ListAnswerCard roles={[makeRole()]} sectionsHint={['achievements']} />
    );

    expect(screen.getByText('1 achievement')).toBeInTheDocument();
    expect(screen.queryByText(/responsibilit/)).not.toBeInTheDocument();
  });

  it('should show only the matching tech chips when the tech was filtered', () => {
    render(
      <ListAnswerCard
        roles={[makeRole()]}
        sectionsHint={['tech']}
        techFilter={['react']}
      />
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('should show a technology count for a tech hint without a filter', () => {
    render(<ListAnswerCard roles={[makeRole()]} sectionsHint={['tech']} />);

    expect(screen.getByText('2 technologies')).toBeInTheDocument();
  });

  it('should show the duration for a period hint', () => {
    render(<ListAnswerCard roles={[makeRole()]} sectionsHint={['period']} />);

    expect(screen.getByText('10 months')).toBeInTheDocument();
  });
});
