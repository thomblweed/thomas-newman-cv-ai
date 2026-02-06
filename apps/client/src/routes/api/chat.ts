import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai';
import { createFileRoute } from '@tanstack/react-router';
import { createErrorResponse } from '@/server/response/error.server';
import { isProduction } from '@/server/env/env.server';
import { getAdapter } from '@/features/chat/server/ai/adapter.server';
import { SYSTEM_PROMPT } from '@/features/chat/ai/system/prompt';
import { profileToolServer } from '@/features/chat/ai/tools/getProfileTool';
import { rolesToolServer } from '@/features/chat/ai/tools/getRolesTool';

export const Route = createFileRoute('/api/chat')({
  server: { handlers: { POST } }
});

export async function POST({ request }: { request: Request }) {
  // Determine which API key is needed based on adapter selection
  const useGemini = !isProduction && process.env.USE_GEMINI === 'true';
  const apiKey = isProduction
    ? process.env.ANTHROPIC_API_KEY
    : useGemini
      ? process.env.GEMINI_API_KEY
      : process.env.OLLAMA_HOST;

  const apiKeyName = isProduction
    ? 'ANTHROPIC_API_KEY'
    : useGemini
      ? 'GEMINI_API_KEY'
      : 'OLLAMA_HOST';

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
