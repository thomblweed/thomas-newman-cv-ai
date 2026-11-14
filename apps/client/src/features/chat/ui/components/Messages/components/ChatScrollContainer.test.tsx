import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useRef, useState } from 'react';

import {
  ChatScrollContainer,
  useChatScrollActions,
  useChatScrollPinned
} from './ChatScrollContainer';

const user = userEvent.setup();

const PinnedProbe = () => {
  const isPinnedToBottom = useChatScrollPinned();

  return <span data-testid="pinned">{String(isPinnedToBottom)}</span>;
};

let actionIdentityChanges = 0;

const ActionsProbe = () => {
  const scrollToBottom = useChatScrollActions();
  const previousScrollToBottom = useRef(scrollToBottom);

  useEffect(() => {
    if (previousScrollToBottom.current !== scrollToBottom) {
      actionIdentityChanges += 1;
      previousScrollToBottom.current = scrollToBottom;
    }
  }, [scrollToBottom]);

  return null;
};

const Harness = () => {
  const [renderCount, setRenderCount] = useState(0);

  return (
    <>
      <button
        data-render-count={renderCount}
        onClick={() => setRenderCount((count) => count + 1)}
      >
        rerender
      </button>
      <ChatScrollContainer>
        <PinnedProbe />
        <ActionsProbe />
      </ChatScrollContainer>
    </>
  );
};

beforeEach(() => {
  actionIdentityChanges = 0;
});

it('should expose the pinned state to consumers', () => {
  render(
    <ChatScrollContainer>
      <PinnedProbe />
    </ChatScrollContainer>
  );

  expect(screen.getByTestId('pinned')).toHaveTextContent('true');
});

it('should keep the actions value referentially stable across renders', async () => {
  render(<Harness />);

  await user.click(screen.getByRole('button', { name: 'rerender' }));

  expect(actionIdentityChanges).toBe(0);
});
