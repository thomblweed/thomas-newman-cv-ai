'use client';

import { Messages } from './components/Messages';
import { ChatForm } from './components/ChatForm';

export const Chat = () => {
  return (
    <>
      <ChatForm />
      <Messages />
    </>
  );
};
