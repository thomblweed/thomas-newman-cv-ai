import { useEffect, useRef } from 'react';

import { useChatContext } from '../context/useChatContext';
import { useAnimatedText } from '../hooks/useAnimatedText';

import { MarkdownMessage } from './MarkdownMessage';

const AnimatedMarkdownMessage = ({ content }: { content: string }) => {
  const animatedText = useAnimatedText(content);
  return <MarkdownMessage content={animatedText} />;
};

export const Messages = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { messages } = useChatContext();

  const lastMessageText = messages[messages.length - 1]?.parts
    ?.filter((p) => p.type === 'text')
    .map((p) => p.content)
    .join('') ?? '';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, lastMessageText]);

  return (
    <div className="flex-1 space-y-3 overflow-y-auto pr-1">
      {messages.length === 0 && (
        <div className="flex h-full items-center justify-center text-base text-grey">
          Ask anything about Thomas&apos;s experience, skills, or projects.
        </div>
      )}

      {messages.map((message) => {
        const isAssistant = message.role === 'assistant';

        return (
          <div
            key={message.id}
            className={`flex w-full ${isAssistant ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded px-4 py-3 text-base ${
                isAssistant
                  ? 'bg-dark/80 text-grey'
                  : 'bg-primary text-dark'
              }`}
            >
              {message.parts.map((part, idx) => {
                if (part.type === 'thinking') {
                  return (
                    <p
                      key={idx}
                      className="text-[11px] italic text-secondary/80"
                    >
                      Thinking&hellip; {part.content}
                    </p>
                  );
                }

                if (part.type === 'text' && isAssistant) {
                  return (
                    <AnimatedMarkdownMessage key={idx} content={part.content} />
                  );
                }

                if (part.type === 'text' && message.role === 'user') {
                  return (
                    <MarkdownMessage key={idx} content={part.content} />
                  );
                }

                return null;
              })}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} aria-hidden />
    </div>
  );
};
