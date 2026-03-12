import { ThinkingIndicator } from './ThinkingIndicator';

export const WaitingIndicator = () => (
  <div className="flex w-full justify-start">
    <div className="max-w-[80%] rounded px-4 py-3 text-base bg-dark/80 text-grey">
      <ThinkingIndicator />
    </div>
  </div>
);
