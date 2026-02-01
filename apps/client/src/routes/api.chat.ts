import { chat, toServerSentEventsResponse } from '@tanstack/ai';
import { createFileRoute } from '@tanstack/react-router';
import { geminiText } from '@tanstack/ai-gemini';
import { getProfileTool } from '@/tools/getProfileTool';

const createErrorResponse = (error: Error) => {
  return new Response(
    JSON.stringify({
      error: error.message
    }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
};

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!process.env.GEMINI_API_KEY) {
          return createErrorResponse(
            new Error('GEMINI_API_KEY not configured')
          );
        }

        const { messages, conversationId } = await request.json();

        try {
          const stream = chat({
            adapter: geminiText('gemini-2.5-flash'),
            messages,
            conversationId,
            tools: [getProfileTool()]
          });

          return toServerSentEventsResponse(stream);
        } catch (error) {
          return createErrorResponse(
            error instanceof Error ? error : new Error('An error occurred')
          );
        }
      }
    }
  }
});

