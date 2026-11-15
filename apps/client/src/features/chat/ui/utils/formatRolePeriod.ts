const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const ONGOING_PERIOD_END = 'present';

const formatMonth = (value: string): string => {
  const [year, month] = value.split('-');
  const monthIndex = Number(month) - 1;
  const name = monthNames[monthIndex];

  return year && name ? `${name} ${year}` : value;
};

export const formatRolePeriod = (start: string, end?: string): string => {
  const from = formatMonth(start);

  if (!end || end === ONGOING_PERIOD_END) return `since ${from}`;

  return `${from} – ${formatMonth(end)}`;
};
