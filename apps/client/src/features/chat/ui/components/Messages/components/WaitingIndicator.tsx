import { MessageBubble } from './MessageBubble';
import { ThinkingIndicator } from './ThinkingIndicator';

export const WaitingIndicator = () => (
  <MessageBubble variant="assistant">
    <ThinkingIndicator />
  </MessageBubble>
);
