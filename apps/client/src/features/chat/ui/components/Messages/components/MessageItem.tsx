import { AnswerCard } from '../../AnswerCard';
import { MarkdownMessage } from '../../MarkdownMessage';
import { messageDrawsContent } from '../../../utils/messageDrawsContent';
import { getAnswerCardData } from '../../../utils/resolveAnswerCard';

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

  if (isAssistant && !messageDrawsContent(message)) return null;

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

        if (part.type === 'tool-call' && isAssistant) {
          const data = getAnswerCardData(part);

          if (!data) return null;

          return data.roles.map((role) => (
            <AnswerCard
              key={`${part.id}-${role.company}-${role.period_start}`}
              role={role}
              sectionsHint={data.sectionsHint}
              roleCount={data.roles.length}
            />
          ));
        }

        return null;
      })}
    </MessageBubble>
  );
};
