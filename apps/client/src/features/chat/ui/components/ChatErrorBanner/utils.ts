export function formatRetryTime(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatResetDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

export function isRetryAllowed(retryAt: Date | null): boolean {
  return retryAt === null || retryAt <= new Date();
}
