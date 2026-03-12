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
        <div>
          <h1 className="text-2xl font-bold text-primary md:text-3xl">
            Ask about my professional experience
          </h1>
          <p className="mt-1 text-base text-grey">
            Chat about experience, skills, or projects. I will answer as quickly
            as I can.
          </p>
          <div className="mt-3">
            <Disclaimer />
          </div>
        </div>
      </ChatHeader>
      <ChatBody>
        <Messages />
        <ChatForm />
      </ChatBody>
    </ChatSection>
  </ChatProvider>
);
