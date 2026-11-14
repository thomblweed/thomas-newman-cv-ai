import { MarkdownMessage } from '../../MarkdownMessage';

import { AnimatedMarkdownMessage } from './AnimatedMarkdownMessage';
import { MessageBubble } from './MessageBubble';
import { ThinkingIndicator } from './ThinkingIndicator';

import type { ChatContextType } from '../../../types/ChatContext.type';

type Message = ChatContextType['messages'][number];
type MessagePart = Message['parts'][number];

type Props = {
  message: Message;
  onContentUpdate: () => void;
};

const hasRenderableText = (message: Message) =>
  message.parts.some(
    (part) =>
      part.type === 'text' &&
      typeof part.content === 'string' &&
      part.content.trim().length > 0
  );

const keyPartsByType = (parts: Message['parts']) => {
  const occurrences = new Map<MessagePart['type'], number>();

  return parts.map((part) => {
    const occurrence = occurrences.get(part.type) ?? 0;
    occurrences.set(part.type, occurrence + 1);

    return { key: `${part.type}-${occurrence}`, part };
  });
};

export const MessageItem = ({ message, onContentUpdate }: Props) => {
  const isAssistant = message.role === 'assistant';

  if (isAssistant && !hasRenderableText(message)) return null;

  return (
    <MessageBubble variant={isAssistant ? 'assistant' : 'user'}>
      {keyPartsByType(message.parts).map(({ key, part }) => {
        if (part.type === 'thinking') {
          return <ThinkingIndicator key={key} />;
        }

        if (part.type === 'text' && isAssistant) {
          return (
            <AnimatedMarkdownMessage
              key={key}
              content={part.content}
              onContentUpdate={onContentUpdate}
            />
          );
        }

        if (part.type === 'text' && !isAssistant) {
          return <MarkdownMessage key={key} content={part.content} />;
        }

        return null;
      })}
    </MessageBubble>
  );
};
