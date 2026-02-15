import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai';
import { createFileRoute } from '@tanstack/react-router';

import { createErrorResponse } from '@/server/response/error.server';
import { getApiKey } from '@/server/env/env.server';
import { getAdapter } from '@/features/chat/server/ai/adapter.server';
import { SYSTEM_PROMPT } from '@/features/chat/ai/system/prompt';
import { getProfileToolServer } from '@/features/chat/server/ai/profileTool.server';
import { getRolesToolServer } from '@/features/chat/server/ai/rolesTool.server';

export const Route = createFileRoute('/api/chat')({
  server: { handlers: { POST } }
});

export async function POST({ request }: { request: Request }) {
  const { apiKey, apiKeyName } = getApiKey();

  if (!apiKey) {
    return createErrorResponse(
      new Error(`${apiKeyName} not configured`)
    );
  }

  const { messages, conversationId } = await request.json();

  try {
    const adapter = await getAdapter();

    const stream = chat({
      adapter,
      messages,
      conversationId,
      systemPrompts: [SYSTEM_PROMPT],
      tools: [getProfileToolServer, getRolesToolServer],
      agentLoopStrategy: maxIterations(5),
      maxTokens: 1024
    });

    return toServerSentEventsResponse(stream);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : new Error('An error occurred')
    );
  }
}
