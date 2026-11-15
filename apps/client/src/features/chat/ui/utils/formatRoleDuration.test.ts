import { formatRoleDuration } from './formatRoleDuration';

it('should pluralise a multi-month duration', () => {
  expect(formatRoleDuration(10)).toBe('10 months');
});

it('should keep a single month singular', () => {
  expect(formatRoleDuration(1)).toBe('1 month');
});

it('should keep a zero-month duration plural', () => {
  expect(formatRoleDuration(0)).toBe('0 months');
});
