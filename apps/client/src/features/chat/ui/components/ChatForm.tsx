import { useEffect, useRef, useState } from 'react';

import { useChatContext } from '../context/useChatContext';

import type { KeyboardEvent, SubmitEventHandler } from 'react';

import { Input } from '@/ui/components/elements/Input';

export const ChatForm = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const wasLoadingRef = useRef(false);
  const { sendMessage, isLoading } = useChatContext();

  useEffect(() => {
    if (wasLoadingRef.current && !isLoading) {
      inputRef.current?.focus();
    }
    wasLoadingRef.current = isLoading;
  }, [isLoading]);

  const handleSubmit: SubmitEventHandler = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (input.trim() && !isLoading) {
        sendMessage(input);
        setInput('');
      }
    }
  };

  const canSend = input.trim() && !isLoading;

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-primary/40 pt-3"
    >
      <div className="relative flex items-center rounded border border-primary bg-inherit transition-[box-shadow,border-color] hover:border-grey focus-within:border-grey focus-within:shadow-focus-glow">
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about my experience, skills, or projects…"
          disabled={isLoading}
          className="h-11 border-0 pr-11 focus:shadow-none focus:outline-none md:h-12"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className="absolute right-1 flex h-9 w-9 shrink-0 items-center justify-center rounded text-grey transition-colors hover:enabled:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>
    </form>
  );
};
