import { parseSectionsHint, resolveAnswerCard } from './resolveAnswerCard';

import type { Role } from '../../interfaces/role.interface';

const makeRole = (overrides: Partial<Role> = {}): Role => ({
  type: 'role',
  company: 'Slice',
  title: 'Senior Frontend Engineer',
  period_start: '2025-07',
  duration_months: 10,
  employment_type: 'full-time',
  tech_stack: ['react', 'typescript'],
  content: `## Responsibilities

### Feature Delivery

Delivering new features

## Key Achievements

### Code Quality

Improved the codebase
`,
  ...overrides
});

describe('When resolving a card with no sections hint', () => {
  it('should resolve a single role to a full card with every section', () => {
    expect(resolveAnswerCard(makeRole(), undefined, 1)).toEqual({
      variant: 'full',
      sections: ['tech', 'responsibilities', 'achievements']
    });
  });

  it('should resolve several roles to a compact card', () => {
    expect(resolveAnswerCard(makeRole(), undefined, 3)).toEqual({
      variant: 'compact',
      sections: ['tech', 'responsibilities', 'achievements']
    });
  });

  it('should resolve to none when no roles were returned', () => {
    expect(resolveAnswerCard(makeRole(), undefined, 0)).toEqual({
      variant: 'none',
      sections: []
    });
  });

  it('should drop sections the role has no content for', () => {
    const role = makeRole({
      content: '# A role with no lists',
      tech_stack: ['react']
    });

    expect(resolveAnswerCard(role, undefined, 1)).toEqual({
      variant: 'full',
      sections: ['tech']
    });
  });
});

describe('When resolving a card with a sections hint', () => {
  it('should render only the hinted sections at full detail', () => {
    expect(resolveAnswerCard(makeRole(), ['achievements'], 4)).toEqual({
      variant: 'full',
      sections: ['achievements']
    });
  });

  it('should drop a hinted section the role has no rows for', () => {
    const role = makeRole({ content: '# A role with no lists' });

    expect(
      resolveAnswerCard(role, ['responsibilities', 'achievements'], 1)
    ).toEqual({ variant: 'none', sections: [] });
  });

  it('should resolve to none for an empty hint', () => {
    expect(resolveAnswerCard(makeRole(), [], 1)).toEqual({
      variant: 'none',
      sections: []
    });
  });
});

describe('When parsing a sections hint from tool arguments', () => {
  it('should return the hinted sections in canonical order', () => {
    expect(parseSectionsHint('{"sections":["achievements","tech"]}')).toEqual([
      'tech',
      'achievements'
    ]);
  });

  it('should ignore values that are not sections', () => {
    expect(parseSectionsHint('{"sections":["tech","nonsense"]}')).toEqual([
      'tech'
    ]);
  });

  it('should return an empty list for an empty hint', () => {
    expect(parseSectionsHint('{"sections":[]}')).toEqual([]);
  });

  it('should return undefined when no sections hint is present', () => {
    expect(parseSectionsHint('{"company":"Slice"}')).toBeUndefined();
  });

  it('should return undefined when the arguments are not valid JSON', () => {
    expect(parseSectionsHint('not json')).toBeUndefined();
  });
});
