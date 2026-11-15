import {
  parseSectionsHint,
  parseTechFilter,
  resolveAnswerCard,
  resolveAnswerCardVariant
} from './resolveAnswerCard';

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

describe('When choosing a card form by cardinality', () => {
  it('should render a full card for a single role', () => {
    expect(resolveAnswerCardVariant(undefined, 1)).toBe('full');
  });

  it('should render compact cards for exactly two roles', () => {
    expect(resolveAnswerCardVariant(undefined, 2)).toBe('compact');
  });

  it('should render a list for three roles', () => {
    expect(resolveAnswerCardVariant(undefined, 3)).toBe('list');
  });

  it('should render a list for many roles', () => {
    expect(resolveAnswerCardVariant(undefined, 11)).toBe('list');
  });

  it('should render no card when no roles were returned', () => {
    expect(resolveAnswerCardVariant(undefined, 0)).toBe('none');
  });

  it('should render no card for an empty sections hint, whatever the cardinality', () => {
    expect(resolveAnswerCardVariant([], 1)).toBe('none');
    expect(resolveAnswerCardVariant([], 4)).toBe('none');
  });
});

describe('When resolving a card with no sections hint', () => {
  it('should resolve a single role to a full card with every section', () => {
    expect(resolveAnswerCard(makeRole(), undefined, 1)).toEqual({
      variant: 'full',
      sections: ['tech', 'responsibilities', 'achievements'],
      period: false
    });
  });

  it('should resolve two roles to a compact card with every section', () => {
    expect(resolveAnswerCard(makeRole(), undefined, 2)).toEqual({
      variant: 'compact',
      sections: ['tech', 'responsibilities', 'achievements'],
      period: false
    });
  });

  it('should resolve three or more roles to a list card', () => {
    expect(resolveAnswerCard(makeRole(), undefined, 3)).toEqual({
      variant: 'list',
      sections: ['tech', 'responsibilities', 'achievements'],
      period: false
    });
  });

  it('should resolve to none when no roles were returned', () => {
    expect(resolveAnswerCard(makeRole(), undefined, 0)).toEqual({
      variant: 'none',
      sections: [],
      period: false
    });
  });

  it('should drop sections the role has no content for', () => {
    const role = makeRole({
      content: '# A role with no lists',
      tech_stack: ['react']
    });

    expect(resolveAnswerCard(role, undefined, 1)).toEqual({
      variant: 'full',
      sections: ['tech'],
      period: false
    });
  });
});

describe('When resolving a card with a sections hint', () => {
  it('should keep the cardinality form rather than the hint', () => {
    expect(resolveAnswerCard(makeRole(), ['achievements'], 4).variant).toBe(
      'list'
    );
  });

  it('should render only the hinted sections at full detail for one role', () => {
    expect(resolveAnswerCard(makeRole(), ['achievements'], 1)).toEqual({
      variant: 'full',
      sections: ['achievements'],
      period: false
    });
  });

  it('should drop a hinted section the role has no rows for', () => {
    const role = makeRole({ content: '# A role with no lists' });

    expect(
      resolveAnswerCard(role, ['responsibilities', 'achievements'], 1)
    ).toEqual({ variant: 'none', sections: [], period: false });
  });

  it('should resolve to none for an empty hint', () => {
    expect(resolveAnswerCard(makeRole(), [], 1)).toEqual({
      variant: 'none',
      sections: [],
      period: false
    });
  });

  it('should mark the period for a period-only hint', () => {
    expect(resolveAnswerCard(makeRole(), ['period'], 1)).toEqual({
      variant: 'full',
      sections: [],
      period: true
    });
  });

  it('should keep the period alongside a content hint', () => {
    expect(resolveAnswerCard(makeRole(), ['tech', 'period'], 2)).toEqual({
      variant: 'compact',
      sections: ['tech'],
      period: true
    });
  });

  it('should keep a list card even when no section is hinted for any role', () => {
    const role = makeRole({
      content: '# A role with no lists',
      tech_stack: []
    });

    expect(resolveAnswerCard(role, undefined, 5)).toEqual({
      variant: 'list',
      sections: [],
      period: false
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

  it('should keep the period hint alongside the sections', () => {
    expect(parseSectionsHint('{"sections":["period","tech"]}')).toEqual([
      'tech',
      'period'
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

describe('When parsing the tech filter from tool arguments', () => {
  it('should return the lower-cased tech slugs', () => {
    expect(parseTechFilter('{"tech":["React","java"]}')).toEqual([
      'react',
      'java'
    ]);
  });

  it('should return nothing when the call carried no tech', () => {
    expect(parseTechFilter('{"company":"Slice"}')).toEqual([]);
  });

  it('should return nothing for malformed arguments', () => {
    expect(parseTechFilter('{not json')).toEqual([]);
  });
});
