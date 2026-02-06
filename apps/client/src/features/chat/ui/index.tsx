'use client';

import { Messages } from './ui/components/Messages';
import { ChatForm } from './ui/components/ChatForm';
import { ChatProvider } from './ui/context/useChatContext';

export const Chat = () => {
  return (
    <ChatProvider>
      <ChatForm />
      <Messages />
    </ChatProvider>
  );
};
