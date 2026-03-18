import {
  createChatClientOptions,
  fetchServerSentEvents,
  useChat
} from '@tanstack/ai-react';
import { clientTools } from '@tanstack/ai-client';
import { createContext, use, useMemo } from 'react';

import { profileToolClient } from '../../ai/tools/profile/client';
import { rolesToolClient } from '../../ai/tools/roles/client';
import { classifyChatError } from '../utils/classifyChatError';

import type { ReactNode } from 'react';
import type { ChatContextType } from '../types/ChatContext.type';
import type { ChatErrorCode } from '@/server/response/chatErrorCode';

const chatClientOptions = createChatClientOptions({
  connection: fetchServerSentEvents('/api/chat'),
  tools: clientTools(profileToolClient, rolesToolClient)
  // onChunk: (chunk) => {
  //   console.log('Chunk type:', chunk.type, chunk);
  // }
});

type ChatActions = Pick<ChatContextType, 'sendMessage' | 'stop' | 'reload'>;
type ChatStatus = Pick<ChatContextType, 'isLoading' | 'error'> & {
  kind: ChatErrorCode | null;
  retryAt: Date | null;
};
type ChatMessages = Pick<ChatContextType, 'messages'>;

const ChatContext = createContext<ChatContextType | undefined>(undefined);
const ChatActionsContext = createContext<ChatActions | undefined>(undefined);
const ChatStatusContext = createContext<ChatStatus | undefined>(undefined);
const ChatMessagesContext = createContext<ChatMessages | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const chat = useChat(chatClientOptions);

  const actions = useMemo<ChatActions>(
    () => ({
      sendMessage: chat.sendMessage,
      stop: chat.stop,
      reload: chat.reload
    }),
    [chat.reload, chat.sendMessage, chat.stop]
  );

  const classification = useMemo(
    () => (chat.error ? classifyChatError(chat.error) : null),
    [chat.error]
  );

  const status = useMemo<ChatStatus>(
    () => ({
      isLoading: chat.isLoading,
      error: chat.error,
      kind: classification?.kind ?? null,
      retryAt: classification?.retryAt ?? null
    }),
    [chat.error, chat.isLoading, classification]
  );

  const messages = useMemo<ChatMessages>(
    () => ({ messages: chat.messages }),
    [chat.messages]
  );

  return (
    <ChatContext value={chat}>
      <ChatActionsContext value={actions}>
        <ChatStatusContext value={status}>
          <ChatMessagesContext value={messages}>{children}</ChatMessagesContext>
        </ChatStatusContext>
      </ChatActionsContext>
    </ChatContext>
  );
};

export const useChatContext = () => {
  const context = use(ChatContext);

  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
};

export const useChatActions = () => {
  const context = use(ChatActionsContext);

  if (context === undefined) {
    throw new Error('useChatActions must be used within a ChatProvider');
  }

  return context;
};

export const useChatStatus = () => {
  const context = use(ChatStatusContext);

  if (context === undefined) {
    throw new Error('useChatStatus must be used within a ChatProvider');
  }

  return context;
};

export const useChatMessages = () => {
  const context = use(ChatMessagesContext);

  if (context === undefined) {
    throw new Error('useChatMessages must be used within a ChatProvider');
  }

  return context;
};
