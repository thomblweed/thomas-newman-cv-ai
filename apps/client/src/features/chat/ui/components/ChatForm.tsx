import { useState } from 'react';

import { useChatContext } from '../context/useChatContext';

import type { SubmitEventHandler } from 'react';

import { Input } from '@/ui/components/elements/Input';
import { Button } from '@/ui/components/elements/Button';

export const ChatForm = () => {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useChatContext();

  const handleSubmit: SubmitEventHandler = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about my experience, skills, or projects..."
        disabled={isLoading}
      />
      <Button type="submit" disabled={!input.trim() || isLoading}>
        Send
      </Button>
    </form>
  );
};
