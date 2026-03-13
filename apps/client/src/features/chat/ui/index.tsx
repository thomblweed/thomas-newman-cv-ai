'use client';

import { ChatProvider } from './context/useChatContext';
import { ChatSection } from './components/ChatSection';
import { ChatHeader } from './components/ChatHeader';
import { ChatBody } from './components/ChatBody';
import { Messages } from './components/Messages';
import { ChatForm } from './components/ChatForm';
import { Disclaimer } from './components/Disclaimer';

export const Chat = () => (
  <ChatProvider>
    <ChatSection>
      <ChatHeader>
        <div className="flex items-center gap-4">
          <h1>Ask about my professional experience</h1>
          <Disclaimer />
        </div>
      </ChatHeader>
      <ChatBody>
        <Messages />
        <ChatForm />
      </ChatBody>
    </ChatSection>
  </ChatProvider>
);
