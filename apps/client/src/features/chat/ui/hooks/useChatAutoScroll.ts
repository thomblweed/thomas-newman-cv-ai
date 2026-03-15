import { useCallback, useEffect, useRef, useState } from 'react';

type ScrollToBottomOptions = {
  behavior?: ScrollBehavior;
};

const PINNED_THRESHOLD_PX = 24;

export const useChatAutoScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);

  const updatePinnedState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsPinnedToBottom(distanceFromBottom < PINNED_THRESHOLD_PX);
  }, []);

  const scrollToBottom = useCallback(
    ({ behavior = 'smooth' }: ScrollToBottomOptions = {}) => {
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior, block: 'end' });
      });
    },
    []
  );

  useEffect(() => {
    updatePinnedState();
  }, [updatePinnedState]);

  return {
    containerRef,
    bottomRef,
    isPinnedToBottom,
    updatePinnedState,
    scrollToBottom
  };
};
