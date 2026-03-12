export const ThinkingIndicator = () => (
  <>
    <span className="inline-flex items-center gap-1" aria-hidden>
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary/80 [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary/80 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary/80 [animation-delay:300ms]" />
    </span>
    <span className="sr-only">Assistant is thinking</span>
  </>
);
