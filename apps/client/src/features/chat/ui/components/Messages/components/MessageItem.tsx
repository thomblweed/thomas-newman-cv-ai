import { MarkdownMessage } from '../../MarkdownMessage';

import { AnimatedMarkdownMessage } from './AnimatedMarkdownMessage';
import { MessageBubble } from './MessageBubble';
import { ThinkingIndicator } from './ThinkingIndicator';

import type { ChatContextType } from '../../../types/ChatContext.type';

type Message = ChatContextType['messages'][number];

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

export const MessageItem = ({ message, onContentUpdate }: Props) => {
  const isAssistant = message.role === 'assistant';

  if (isAssistant && !hasRenderableText(message)) return null;

  return (
    <MessageBubble variant={isAssistant ? 'assistant' : 'user'}>
      {message.parts.map((part, idx) => {
        if (part.type === 'thinking') {
          return <ThinkingIndicator key={idx} />;
        }

        if (part.type === 'text' && isAssistant) {
          return (
            <AnimatedMarkdownMessage
              key={idx}
              content={part.content}
              onContentUpdate={onContentUpdate}
            />
          );
        }

        if (part.type === 'text' && !isAssistant) {
          return <MarkdownMessage key={idx} content={part.content} />;
        }

        return null;
      })}
    </MessageBubble>
  );
};
