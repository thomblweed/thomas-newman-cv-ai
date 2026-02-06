import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai';
import { createFileRoute } from '@tanstack/react-router';
import { profileToolServer } from '@/ai/tools/getProfileTool';
import { rolesToolServer } from '@/ai/tools/getRolesTool';
import { SYSTEM_PROMPT } from '@/ai/system/prompt';
import { getAdapter } from '@/server/ai/adapter.server';
import { createErrorResponse } from '@/server/response/error.server';
import { isProduction } from '@/server/env/env.server';

const apiKey = isProduction
  ? process.env.ANTHROPIC_API_KEY
  : process.env.OLLAMA_HOST;

export const Route = createFileRoute('/api/chat')({
  server: { handlers: { POST } }
});

export async function POST({ request }: { request: Request }) {
  if (!apiKey) {
    return createErrorResponse(
      new Error(
        `${isProduction ? 'ANTHROPIC_API_KEY' : 'OLLAMA_HOST'} not configured`
      )
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
      tools: [profileToolServer, rolesToolServer],
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
