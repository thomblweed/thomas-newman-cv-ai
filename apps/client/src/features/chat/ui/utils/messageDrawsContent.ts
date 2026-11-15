import { getAnswerCardData, resolveAnswerCard } from './resolveAnswerCard';

import type { ChatContextType } from '../types/ChatContext.type';

type Message = ChatContextType['messages'][number];
type MessagePart = Message['parts'][number];

const partDrawsContent = (part: MessagePart): boolean => {
  if (part.type === 'thinking') return true;
  if (part.type === 'text') return part.content.trim().length > 0;

  const data = getAnswerCardData(part);

  return (
    data?.roles.some(
      (role) =>
        resolveAnswerCard(role, data.sectionsHint, data.roles.length)
          .variant !== 'none'
    ) ?? false
  );
};

export const messageDrawsContent = (message: Message): boolean =>
  message.parts.some(partDrawsContent);
