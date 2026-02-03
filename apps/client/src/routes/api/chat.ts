import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai';
import { createFileRoute } from '@tanstack/react-router';
import { anthropicSummarize, anthropicText } from '@tanstack/ai-anthropic';
import { profileToolServer } from '@/ai/tools/getProfileTool';
import { rolesToolServer } from '@/ai/tools/getRolesTool';
import { SYSTEM_PROMPT } from '@/ai/system/prompt';

const createErrorResponse = (error: Error) => {
  return new Response(
    JSON.stringify({
      error: error.message
    }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
};

const OLLAMA_MODAL = 'mistral-nemo:12b';
const ANTHROPIC_MODEL = 'claude-haiku-4-5';

export const Route = createFileRoute('/api/chat')({
  server: { handlers: { POST } }
});

export async function POST({ request }: { request: Request }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return createErrorResponse(new Error('ANTHROPIC_API_KEY not configured'));
  }

  const { messages, conversationId } = await request.json();

  try {
    const stream = chat({
      adapter: anthropicText(ANTHROPIC_MODEL),
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
