import { useEffect, useRef, useState } from 'react';

import { useChatActions, useChatStatus } from '../context/useChatContext';

import { SendIcon } from './SendIcon';

import type { KeyboardEvent, SubmitEventHandler } from 'react';

import { Input } from '@/ui/components/elements/Input';

export const ChatForm = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const wasLoadingRef = useRef(false);
  const { sendMessage } = useChatActions();
  const { isLoading } = useChatStatus();

  const trySend = () => {
    const message = input.trim();
    if (!message || isLoading) return;

    sendMessage(message);
    setInput('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (wasLoadingRef.current && !isLoading) {
      inputRef.current?.focus();
    }
    wasLoadingRef.current = isLoading;
  }, [isLoading]);

  const handleSubmit: SubmitEventHandler = (e) => {
    e.preventDefault();
    trySend();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      trySend();
    }
  };

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <form onSubmit={handleSubmit} className="border-t border-primary/40 pt-4">
      <div className="relative flex items-center rounded border border-primary bg-inherit transition-[box-shadow,border-color] hover:border-grey focus-within:border-grey focus-within:shadow-focus-glow">
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about my experience, skills, or projects…"
          disabled={isLoading}
          className="h-11 border-0 pr-12 focus:shadow-none focus:outline-none md:h-12"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className="absolute right-2 flex h-9 w-9 shrink-0 items-center justify-center rounded text-grey transition-colors hover:enabled:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <SendIcon aria-hidden />
        </button>
      </div>
    </form>
  );
};
