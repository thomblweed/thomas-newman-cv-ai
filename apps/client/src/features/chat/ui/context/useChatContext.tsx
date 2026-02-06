import {
  createChatClientOptions,
  fetchServerSentEvents,
  useChat
} from '@tanstack/ai-react';
import { createContext, use } from 'react';
import type { ReactNode } from 'react';

const ChatContext = createContext<ReturnType<typeof useChat> | null>(null);

export const chatOptions = createChatClientOptions({
  connection: fetchServerSentEvents('/api/chat'),
  onChunk: (chunk) => {
    console.log('Chunk type:', chunk.type, chunk);
  }
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const chat = useChat(chatOptions);

  return <ChatContext value={chat}>{children}</ChatContext>;
};

export const useChatContext = () => {
  const context = use(ChatContext);

  if (context === null) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
};
