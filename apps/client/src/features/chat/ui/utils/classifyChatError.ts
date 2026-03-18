import type { ChatErrorCode } from '@/server/response/chatErrorCode';

export type ClassifiedChatError = {
  kind: ChatErrorCode;
  retryAt: Date | null;
};

const DEFAULT_RATE_LIMIT_RETRY_SECONDS = 60;

// TanStack AI client throws: "HTTP error! status: 429 Too Many Requests"
function parseHttpStatus(message: string): number | null {
  const match = message.match(/status:\s*(\d{3})/);
  return match?.[1] ? parseInt(match[1], 10) : null;
}

function endOfDayUtc(): Date {
  const d = new Date();
  d.setUTCHours(23, 59, 59, 999);
  return d;
}

export function classifyChatError(error: Error): ClassifiedChatError {
  const status = parseHttpStatus(error.message);

  if (status === 429) {
    const retryAt = new Date(
      Date.now() + DEFAULT_RATE_LIMIT_RETRY_SECONDS * 1000
    );
    return { kind: 'rate_limit', retryAt };
  }

  if (status === 402) {
    return { kind: 'token_limit', retryAt: endOfDayUtc() };
  }

  if (status === 503) {
    return { kind: 'unavailable', retryAt: null };
  }

  return { kind: 'unknown', retryAt: null };
}
