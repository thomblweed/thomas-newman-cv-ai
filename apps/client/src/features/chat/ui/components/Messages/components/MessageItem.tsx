import { AnswerCard } from '../../AnswerCard';
import { ListAnswerCard } from '../../AnswerCard/components/ListAnswerCard';
import { MarkdownMessage } from '../../MarkdownMessage';
import { messageDrawsContent } from '../../../utils/messageDrawsContent';
import { getAnswerCardData } from '../../../utils/resolveAnswerCard';

import { AnimatedMarkdownMessage } from './AnimatedMarkdownMessage';
import { MessageBubble } from './MessageBubble';
import { ThinkingIndicator } from './ThinkingIndicator';

import type { ChatContextType } from '../../../types/ChatContext.type';
import type { ReactNode } from 'react';

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

// Answer cards are evidence for the prose, so the prose renders first.
const renderOrder = (parts: Message['parts']) => {
  const keyed = keyPartsByType(parts);
  const cards = keyed.filter(({ part }) => part.type === 'tool-call');

  return { cards, rest: keyed.filter(({ part }) => part.type !== 'tool-call') };
};

const renderCard = (part: MessagePart, key: string): ReactNode => {
  const data = getAnswerCardData(part);

  if (!data) return null;
  if (data.variant === 'list') {
    return (
      <ListAnswerCard
        key={key}
        roles={data.roles}
        sectionsHint={data.sectionsHint}
        techFilter={data.techFilter}
      />
    );
  }

  return data.roles.map((role) => (
    <AnswerCard
      key={`${key}-${role.company}-${role.period_start}`}
      role={role}
      sectionsHint={data.sectionsHint}
      roleCount={data.roles.length}
    />
  ));
};

export const MessageItem = ({ message, onContentUpdate }: Props) => {
  const isAssistant = message.role === 'assistant';

  if (isAssistant && !messageDrawsContent(message)) return null;

  const { cards, rest } = renderOrder(message.parts);

  const renderPart = ({ key, part }: { key: string; part: MessagePart }) => {
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
  };

  return (
    <MessageBubble variant={isAssistant ? 'assistant' : 'user'}>
      {rest.map(renderPart)}
      {isAssistant ? cards.map(({ key, part }) => renderCard(part, key)) : null}
    </MessageBubble>
  );
};
