import { parseRoleContent } from './parseRoleContent';

const roleContent = `# Senior Frontend Engineer at Slice

**July 2025 - Present**

## Company Context

A short paragraph.

## Tech Stack

- React
- TypeScript

## Responsibilities

### Feature Delivery

Delivering new features for a menu building system

### Team Support

Supporting junior engineers on the team

## Key Achievements

### Code Quality & Architecture

Improved sections of the codebase for scalability
`;

it('should parse responsibilities from the Responsibilities section', () => {
  const { responsibilities } = parseRoleContent(roleContent);

  expect(responsibilities).toEqual([
    {
      title: 'Feature Delivery',
      detail: 'Delivering new features for a menu building system'
    },
    {
      title: 'Team Support',
      detail: 'Supporting junior engineers on the team'
    }
  ]);
});

it('should parse achievements from the Key Achievements section', () => {
  const { achievements } = parseRoleContent(roleContent);

  expect(achievements).toEqual([
    {
      title: 'Code Quality & Architecture',
      detail: 'Improved sections of the codebase for scalability'
    }
  ]);
});

it('should ignore third level headings outside the parsed sections', () => {
  const content = `## Company Context

### Not A Row

Should be ignored

## Responsibilities

### A Real Row

Should be kept
`;

  const { responsibilities, achievements } = parseRoleContent(content);

  expect(responsibilities).toEqual([
    { title: 'A Real Row', detail: 'Should be kept' }
  ]);
  expect(achievements).toEqual([]);
});

it('should return empty arrays when the sections are missing', () => {
  const { responsibilities, achievements } = parseRoleContent(
    '# A role with no lists'
  );

  expect(responsibilities).toEqual([]);
  expect(achievements).toEqual([]);
});

it('should keep a multi-line detail together', () => {
  const content = `## Responsibilities

### A Row

First line of detail
Second line of detail
`;

  const { responsibilities } = parseRoleContent(content);

  expect(responsibilities).toEqual([
    { title: 'A Row', detail: 'First line of detail\nSecond line of detail' }
  ]);
});

it('should not confuse the Key Achievements heading for Responsibilities', () => {
  const content = `## Key Achievements

### Achievement

Achievement detail
`;

  const { responsibilities, achievements } = parseRoleContent(content);

  expect(responsibilities).toEqual([]);
  expect(achievements).toEqual([
    { title: 'Achievement', detail: 'Achievement detail' }
  ]);
});
