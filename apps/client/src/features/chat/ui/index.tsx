'use client';

import { Messages } from './components/Messages';
import { ChatForm } from './components/ChatForm';
import { ChatProvider } from './context/useChatContext';

export const Chat = () => {
  return (
    <ChatProvider>
      <ChatForm />
      <Messages />
    </ChatProvider>
  );
};
