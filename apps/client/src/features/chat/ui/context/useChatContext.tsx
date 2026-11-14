import {
  createChatClientOptions,
  fetchServerSentEvents,
  useChat
} from '@tanstack/ai-react';
import { clientTools } from '@tanstack/ai-client';
import { createContext, use, useMemo, useState } from 'react';

import { profileToolClient } from '../../ai/tools/profile/client';
import { rolesToolClient } from '../../ai/tools/roles/client';
import { classifyChatError } from '../utils/classifyChatError';

import type { ReactNode } from 'react';
import type { ChatContextType } from '../types/ChatContext.type';
import type { ChatErrorCode } from '@/server/response/chatErrorCode';

const connection = fetchServerSentEvents('/api/chat');
const tools = clientTools(profileToolClient, rolesToolClient);

type ChatActions = Pick<ChatContextType, 'sendMessage' | 'stop' | 'reload'>;
type ChatStatus = Pick<ChatContextType, 'isLoading' | 'error'> & {
  kind: ChatErrorCode | null;
  retryAt: Date | null;
};
type ChatMessages = Pick<ChatContextType, 'messages'>;

const ChatActionsContext = createContext<ChatActions | undefined>(undefined);
const ChatStatusContext = createContext<ChatStatus | undefined>(undefined);
const ChatMessagesContext = createContext<ChatMessages | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [threadId] = useState(() => crypto.randomUUID());
  const chatClientOptions = createChatClientOptions({
    connection,
    threadId,
    tools
    // onChunk: (chunk) => {
    //   console.log('Chunk type:', chunk.type, chunk);
    // }
  });
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
    <ChatActionsContext value={actions}>
      <ChatStatusContext value={status}>
        <ChatMessagesContext value={messages}>{children}</ChatMessagesContext>
      </ChatStatusContext>
    </ChatActionsContext>
  );
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
