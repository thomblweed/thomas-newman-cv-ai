import { formatRolePeriod } from './formatRolePeriod';

it('should format a closed period as a month range', () => {
  expect(formatRolePeriod('2020-07', '2021-05')).toBe('Jul 2020 – May 2021');
});

it('should format an ongoing period with a since prefix', () => {
  expect(formatRolePeriod('2026-05')).toBe('since May 2026');
});

it('should treat the present period end as ongoing', () => {
  expect(formatRolePeriod('2026-05', 'present')).toBe('since May 2026');
});

it('should fall back to the raw value when the period cannot be parsed', () => {
  expect(formatRolePeriod('whenever')).toBe('since whenever');
});
