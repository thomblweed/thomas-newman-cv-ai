import { getAnswerCardData, resolveAnswerCard } from './resolveAnswerCard';

import type { ChatContextType } from '../types/ChatContext.type';

type Message = ChatContextType['messages'][number];
type MessagePart = Message['parts'][number];

const partDrawsContent = (part: MessagePart): boolean => {
  if (part.type === 'thinking') return true;
  if (part.type === 'text') return part.content.trim().length > 0;

  const data = getAnswerCardData(part);

  if (!data) return false;
  if (data.variant === 'list') return true;

  return data.roles.some(
    (role) =>
      resolveAnswerCard(role, data.sectionsHint, data.roles.length).variant !==
      'none'
  );
};

export const messageDrawsContent = (message: Message): boolean =>
  message.parts.some(partDrawsContent);
