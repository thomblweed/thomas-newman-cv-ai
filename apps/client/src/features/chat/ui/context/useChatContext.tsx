import {
  createChatClientOptions,
  fetchServerSentEvents,
  useChat
} from '@tanstack/ai-react';
import { clientTools } from '@tanstack/ai-client';
import { createContext, use } from 'react';

import { profileToolClient } from '../tools/profileTool';
import { rolesToolClient } from '../tools/rolesTool';

import type { ReactNode } from 'react';
import type { ChatContextType } from '../types/ChatContext.type';

const chatClientOptions = createChatClientOptions({
  connection: fetchServerSentEvents('/api/chat'),
  tools: clientTools(profileToolClient, rolesToolClient),
  onChunk: (chunk) => {
    console.log('Chunk type:', chunk.type, chunk);
  }
});

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const chat = useChat(chatClientOptions);

  return <ChatContext value={chat}>{children}</ChatContext>;
};

export const useChatContext = () => {
  const context = use(ChatContext);

  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
};
