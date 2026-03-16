import { useCallback, useEffect, useRef } from 'react';

import {
  useChatMessages,
  useChatStatus
} from '../../../context/useChatContext';

import { MessageItem } from './MessageItem';
import { useChatScroll } from './ChatScrollContainer';
import { WaitingIndicator } from './WaitingIndicator';

export const MessageList = () => {
  const { messages } = useChatMessages();
  const { isLoading } = useChatStatus();
  const { isPinnedToBottom, scrollToBottom } = useChatScroll();

  const lastMessage = messages.at(-1);

  const lastMessageText =
    lastMessage?.parts
      ?.filter((p) => p.type === 'text')
      .map((p) => p.content)
      .join('') ?? '';

  const assistantHasVisibleContent =
    lastMessage?.role === 'assistant' &&
    lastMessage.parts?.some(
      (p) =>
        p.type === 'thinking' ||
        (p.type === 'text' &&
          typeof p.content === 'string' &&
          p.content.trim().length > 0)
    );

  const showWaitingIndicator = isLoading && !assistantHasVisibleContent;

  const isPinnedRef = useRef(isPinnedToBottom);
  useEffect(() => {
    isPinnedRef.current = isPinnedToBottom;
  }, [isPinnedToBottom]);

  const handleContentUpdate = useCallback(() => {
    if (!isPinnedRef.current) return;
    scrollToBottom({ behavior: 'auto' });
  }, [scrollToBottom]);

  useEffect(() => {
    if (!isPinnedToBottom) return;
    scrollToBottom({ behavior: 'smooth' });
  }, [isPinnedToBottom, messages, lastMessageText, scrollToBottom]);

  return (
    <>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onContentUpdate={handleContentUpdate}
        />
      ))}
      {showWaitingIndicator ? <WaitingIndicator /> : null}
    </>
  );
};
