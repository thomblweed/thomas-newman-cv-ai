import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai';
import { createFileRoute } from '@tanstack/react-router';
import { ollamaText } from '@tanstack/ai-ollama';
import { profileToolServer } from '@/ai/tools/getProfileTool';
import { SYSTEM_PROMPT } from '@/ai/system/prompt';

const createErrorResponse = (error: Error) => {
  return new Response(
    JSON.stringify({
      error: error.message
    }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
};

export const Route = createFileRoute('/api/chat')({
  server: { handlers: { POST } }
});

export async function POST({ request }: { request: Request }) {
  // const apiKey = process.env.GEMINI_API_KEY;
  // if (!apiKey) {
  //   return createErrorResponse(
  //     new Error('GEMINI_API_KEY not configured')
  //   );
  // }

  const { messages, conversationId } = await request.json();

  try {
    const stream = chat({
      adapter: ollamaText('llama3.1'),
      messages,
      conversationId,
      agentLoopStrategy: maxIterations(5),
      systemPrompts: [SYSTEM_PROMPT],
      tools: [profileToolServer],
      modelOptions: {
        think: true,
        model: 'llama3.1'
      }
    });

    return toServerSentEventsResponse(stream);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : new Error('An error occurred')
    );
  }
}
