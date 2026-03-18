import type { ChatErrorCode } from './chatErrorCode';

type ErrorResponseOptions = {
  code?: ChatErrorCode;
  status?: number;
  retryAfterSeconds?: number;
};

export const createErrorResponse = (
  error: Error,
  {
    code = 'unknown',
    status = 500,
    retryAfterSeconds
  }: ErrorResponseOptions = {}
) => {
  const body: Record<string, unknown> = { error: error.message, code };
  if (retryAfterSeconds !== undefined) {
    body.retryAfterSeconds = retryAfterSeconds;
  }
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
};
