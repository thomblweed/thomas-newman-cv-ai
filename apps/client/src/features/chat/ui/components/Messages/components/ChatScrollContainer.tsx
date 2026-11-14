import { createContext, use } from 'react';

import { useChatAutoScroll } from '../../../hooks/useChatAutoScroll';

import type { ReactNode } from 'react';

type ScrollToBottom = ReturnType<typeof useChatAutoScroll>['scrollToBottom'];

const ChatScrollPinnedContext = createContext<boolean | undefined>(undefined);
const ChatScrollActionsContext = createContext<ScrollToBottom | undefined>(
  undefined
);

export const useChatScrollPinned = () => {
  const isPinnedToBottom = use(ChatScrollPinnedContext);

  if (isPinnedToBottom === undefined)
    throw new Error(
      'useChatScrollPinned must be used within a ChatScrollContainer'
    );

  return isPinnedToBottom;
};

export const useChatScrollActions = () => {
  const scrollToBottom = use(ChatScrollActionsContext);

  if (scrollToBottom === undefined)
    throw new Error(
      'useChatScrollActions must be used within a ChatScrollContainer'
    );

  return scrollToBottom;
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
    <ChatScrollPinnedContext value={isPinnedToBottom}>
      <ChatScrollActionsContext value={scrollToBottom}>
        <div
          ref={containerRef}
          className="flex-1 space-y-4 overflow-y-auto pr-2"
          onScroll={updatePinnedState}
        >
          {children}
          <div ref={bottomRef} aria-hidden />
        </div>
      </ChatScrollActionsContext>
    </ChatScrollPinnedContext>
  );
};
