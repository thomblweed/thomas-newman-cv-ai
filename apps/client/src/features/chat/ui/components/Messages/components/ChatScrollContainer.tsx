import { createContext, use } from 'react';

import { useChatAutoScroll } from '../../../hooks/useChatAutoScroll';

import type { ReactNode } from 'react';

type ScrollToBottomOptions = { behavior?: ScrollBehavior };

type ChatScrollContextType = {
  isPinnedToBottom: boolean;
  scrollToBottom: (options?: ScrollToBottomOptions) => void;
};

const ChatScrollContext = createContext<ChatScrollContextType | undefined>(
  undefined
);

export const useChatScroll = () => {
  const ctx = use(ChatScrollContext);

  if (!ctx)
    throw new Error('useChatScroll must be used within a ChatScrollContainer');

  return ctx;
};

type Props = { children: ReactNode };

export const ChatScrollContainer = ({ children }: Props) => {
  const {
    containerRef,
    bottomRef,
    isPinnedToBottom,
    updatePinnedState,
    scrollToBottom
  } = useChatAutoScroll();

  return (
    <ChatScrollContext value={{ isPinnedToBottom, scrollToBottom }}>
      <div
        ref={containerRef}
        className="flex-1 space-y-4 overflow-y-auto pr-2"
        onScroll={updatePinnedState}
      >
        {children}
        <div ref={bottomRef} aria-hidden />
      </div>
    </ChatScrollContext>
  );
};
