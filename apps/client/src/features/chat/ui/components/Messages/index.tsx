import { ChatScrollContainer } from './components/ChatScrollContainer';
import { MessageList } from './components/MessageList';

export const Messages = () => {
  return (
    <ChatScrollContainer>
      <MessageList />
    </ChatScrollContainer>
  );
};
