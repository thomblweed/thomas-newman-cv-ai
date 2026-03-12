import { useEffect, useRef, useState } from 'react';

type ScrollToBottomOptions = {
  behavior?: ScrollBehavior;
};

export const useChatAutoScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);

  const updatePinnedState = () => {
    const el = containerRef.current;
    if (!el) return;

    // Consider "pinned" when within 24px of the bottom.
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsPinnedToBottom(distanceFromBottom < 24);
  };

  const scrollToBottom = ({
    behavior = 'smooth'
  }: ScrollToBottomOptions = {}) => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior, block: 'end' });
    });
  };

  // If layout changes while pinned, keep the pinned state accurate.
  useEffect(() => {
    updatePinnedState();
  }, []);

  return {
    containerRef,
    bottomRef,
    isPinnedToBottom,
    updatePinnedState,
    scrollToBottom
  };
};
