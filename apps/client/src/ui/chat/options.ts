import {
  createChatClientOptions,
  fetchServerSentEvents
} from '@tanstack/ai-react';

export const chatOptions = createChatClientOptions({
  connection: fetchServerSentEvents('/api/chat')
  // onChunk: (chunk) => {
  //   console.log('Received chunk:', chunk);
  // }
});
