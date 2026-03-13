import { useEffect } from 'react';

import { useChatMessages, useChatStatus } from '../../context/useChatContext';
import { useChatAutoScroll } from '../../hooks/useChatAutoScroll';
import { MarkdownMessage } from '../MarkdownMessage';

import { AnimatedMarkdownMessage } from './components/AnimatedMarkdownMessage';
import { ThinkingIndicator } from './components/ThinkingIndicator';
import { WaitingIndicator } from './components/WaitingIndicator';

import { cn } from '@/lib/utils';

export const Messages = () => {
  const { messages } = useChatMessages();
  const { isLoading } = useChatStatus();

  const {
    containerRef,
    bottomRef,
    isPinnedToBottom,
    updatePinnedState,
    scrollToBottom
  } = useChatAutoScroll();

  const lastMessageText =
    messages[messages.length - 1]?.parts
      ?.filter((p) => p.type === 'text')
      .map((p) => p.content)
      .join('') ?? '';

  const assistantHasStartedResponding = (() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role !== 'assistant') return false;
    return (
      lastMessage.parts?.some(
        (p) =>
          p.type === 'text' &&
          typeof p.content === 'string' &&
          p.content.trim().length > 0
      ) ?? false
    );
  })();

  const assistantHasThinkingPart = messages.some(
    (message) =>
      message.role === 'assistant' &&
      message.parts?.some((part) => part.type === 'thinking')
  );

  const showWaitingIndicator =
    isLoading && !assistantHasStartedResponding && !assistantHasThinkingPart;

  useEffect(() => {
    if (!isPinnedToBottom) return;
    scrollToBottom({ behavior: 'smooth' });
  }, [isPinnedToBottom, messages, lastMessageText, scrollToBottom]);

  return (
    <div
      ref={containerRef}
      className="flex-1 space-y-3 overflow-y-auto pr-1"
      onScroll={updatePinnedState}
    >
      {messages.map((message) => {
        const isAssistant = message.role === 'assistant';

        const hasRenderableText = message.parts.some(
          (part) =>
            part.type === 'text' &&
            typeof part.content === 'string' &&
            part.content.trim().length > 0
        );

        if (isAssistant && !hasRenderableText) {
          return null;
        }

        return (
          <div
            key={message.id}
            className={cn(
              'flex w-full',
              isAssistant ? 'justify-start' : 'justify-end'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] rounded px-4 py-3 text-base',
                isAssistant ? 'bg-dark/80 text-grey' : 'bg-primary text-dark'
              )}
            >
              {message.parts.map((part, idx) => {
                if (part.type === 'thinking') {
                  return <ThinkingIndicator key={idx} />;
                }

                if (part.type === 'text' && isAssistant) {
                  return (
                    <AnimatedMarkdownMessage
                      key={idx}
                      content={part.content}
                      onRender={() => {
                        if (!isPinnedToBottom) return;
                        scrollToBottom({ behavior: 'auto' });
                      }}
                    />
                  );
                }

                if (part.type === 'text' && message.role === 'user') {
                  return <MarkdownMessage key={idx} content={part.content} />;
                }

                return null;
              })}
            </div>
          </div>
        );
      })}
      {showWaitingIndicator ? <WaitingIndicator /> : null}
      <div ref={bottomRef} aria-hidden />
    </div>
  );
};
