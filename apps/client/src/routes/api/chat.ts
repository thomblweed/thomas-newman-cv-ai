import '@tanstack/react-start/server-only';

import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai';
import { createFileRoute } from '@tanstack/react-router';

import type { ChatErrorCode } from '@/server/response/chatErrorCode';

import { createErrorResponse } from '@/server/response/error.server';
import { getApiKey } from '@/server/env/env.server';
import { getAdapter } from '@/features/chat/server/ai/adapter.server';
import { getSystemPrompt } from '@/features/chat/ai/system/prompt';
import { profileToolServer } from '@/features/chat/ai/tools/profile/server';
import { rolesToolServer } from '@/features/chat/ai/tools/roles/server';

export const Route = createFileRoute('/api/chat')({
  server: { handlers: { POST } }
});

const DEFAULT_RATE_LIMIT_RETRY_SECONDS = 60;

function classifyProviderError(error: Error): {
  code: ChatErrorCode;
  status: number;
  retryAfterSeconds?: number;
} {
  const message = error.message.toLowerCase();

  const isRateLimit =
    message.includes('rate limit') ||
    message.includes('rate_limit') ||
    message.includes('too many requests') ||
    message.includes('429');

  const isTokenLimit =
    message.includes('quota') ||
    message.includes('billing') ||
    message.includes('usage limit') ||
    message.includes('credit') ||
    message.includes('token limit exceeded');

  const isUnavailable =
    message.includes('unavailable') ||
    message.includes('overloaded') ||
    message.includes('503') ||
    message.includes('service error') ||
    message.includes('connection');

  const retryAfterSeconds = extractRetryAfter(error);

  // token_limit uses 402 (Payment Required) so the client can distinguish
  // it from a per-minute rate limit, which uses standard 429.
  if (isTokenLimit) {
    return { code: 'token_limit', status: 402 };
  }
  if (isRateLimit) {
    return {
      code: 'rate_limit',
      status: 429,
      retryAfterSeconds: retryAfterSeconds ?? DEFAULT_RATE_LIMIT_RETRY_SECONDS
    };
  }
  if (isUnavailable) {
    return { code: 'unavailable', status: 503 };
  }

  return { code: 'unknown', status: 500 };
}

function extractRetryAfter(error: Error): number | undefined {
  const match = error.message.match(/retry.?after[:\s]+(\d+)/i);
  if (match?.[1]) return parseInt(match[1], 10);

  // Some provider SDKs attach the raw response as a property
  const raw = (error as unknown as Record<string, unknown>).response;
  if (raw instanceof Response) {
    const header = raw.headers.get('Retry-After');
    if (header) return parseInt(header, 10);
  }

  return undefined;
}

export async function POST({ request }: { request: Request }) {
  const { apiKey, apiKeyName } = getApiKey();

  if (!apiKey) {
    return createErrorResponse(new Error(`${apiKeyName} not configured`), {
      code: 'unavailable',
      status: 503
    });
  }

  const { messages, conversationId } = await request.json();

  try {
    const adapter = await getAdapter();

    const stream = chat({
      adapter,
      messages,
      conversationId,
      systemPrompts: [getSystemPrompt()],
      tools: [profileToolServer, rolesToolServer],
      agentLoopStrategy: maxIterations(5),
      maxTokens: 1024
    });

    return toServerSentEventsResponse(stream);
  } catch (error) {
    const err = error instanceof Error ? error : new Error('An error occurred');
    const classification = classifyProviderError(err);
    return createErrorResponse(err, classification);
  }
}
