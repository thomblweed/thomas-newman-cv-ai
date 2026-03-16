import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MessageList } from './MessageList';

const user = userEvent.setup();
const mockScrollToBottom = vi.fn();

type MockPart = { type: string; content: string };
type MockMessage = {
  id: string;
  role: 'user' | 'assistant';
  parts: MockPart[];
};

let mockMessages: MockMessage[] = [];
let mockIsLoading = false;
let mockIsPinnedToBottom = true;

vi.mock('../../../context/useChatContext', () => ({
  useChatMessages: () => ({ messages: mockMessages }),
  useChatStatus: () => ({ isLoading: mockIsLoading })
}));

vi.mock('./ChatScrollContainer', () => ({
  useChatScroll: () => ({
    isPinnedToBottom: mockIsPinnedToBottom,
    scrollToBottom: mockScrollToBottom
  })
}));

vi.mock('./MessageItem', () => ({
  MessageItem: ({
    message,
    onContentUpdate
  }: {
    message: { id: string };
    onContentUpdate: () => void;
  }) => (
    <article data-testid={`message-${message.id}`}>
      <button onClick={onContentUpdate}>trigger content update</button>
    </article>
  )
}));

vi.mock('./WaitingIndicator', () => ({
  WaitingIndicator: () => <div>Waiting for response</div>
}));

beforeEach(() => {
  mockMessages = [];
  mockIsLoading = false;
  mockIsPinnedToBottom = true;
});

afterEach(() => {
  mockScrollToBottom.mockClear();
});

it('should render a MessageItem for each message', () => {
  mockMessages = [
    { id: '1', role: 'user', parts: [{ type: 'text', content: 'Hello' }] },
    { id: '2', role: 'assistant', parts: [{ type: 'text', content: 'Hi' }] }
  ];

  render(<MessageList />);

  expect(screen.getByTestId('message-1')).toBeInTheDocument();
  expect(screen.getByTestId('message-2')).toBeInTheDocument();
});

it('should render no messages when the list is empty', () => {
  render(<MessageList />);

  expect(screen.queryByTestId(/^message-/)).not.toBeInTheDocument();
});

it('should not render the waiting indicator when not loading', () => {
  render(<MessageList />);

  expect(screen.queryByText('Waiting for response')).not.toBeInTheDocument();
});

describe('When the chat is loading', () => {
  beforeEach(() => {
    mockIsLoading = true;
  });

  it('should show the waiting indicator when there are no messages', () => {
    render(<MessageList />);

    expect(screen.getByText('Waiting for response')).toBeInTheDocument();
  });

  it('should show the waiting indicator when the last message is from the user', () => {
    mockMessages = [
      { id: '1', role: 'user', parts: [{ type: 'text', content: 'Hello' }] }
    ];

    render(<MessageList />);

    expect(screen.getByText('Waiting for response')).toBeInTheDocument();
  });

  it('should show the waiting indicator when the last assistant message has only whitespace', () => {
    mockMessages = [
      { id: '1', role: 'assistant', parts: [{ type: 'text', content: '   ' }] }
    ];

    render(<MessageList />);

    expect(screen.getByText('Waiting for response')).toBeInTheDocument();
  });

  it('should not show the waiting indicator when the last assistant message has visible text', () => {
    mockMessages = [
      {
        id: '1',
        role: 'assistant',
        parts: [{ type: 'text', content: 'Here is the answer' }]
      }
    ];

    render(<MessageList />);

    expect(screen.queryByText('Waiting for response')).not.toBeInTheDocument();
  });

  it('should not show the waiting indicator when the last assistant message has a thinking part', () => {
    mockMessages = [
      { id: '1', role: 'assistant', parts: [{ type: 'thinking', content: '' }] }
    ];

    render(<MessageList />);

    expect(screen.queryByText('Waiting for response')).not.toBeInTheDocument();
  });
});

describe('When the user is pinned to the bottom', () => {
  it('should call scrollToBottom with smooth on mount', () => {
    render(<MessageList />);

    expect(mockScrollToBottom).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should call scrollToBottom with smooth when new messages arrive', () => {
    mockMessages = [
      { id: '1', role: 'user', parts: [{ type: 'text', content: 'Hello' }] }
    ];

    const { rerender } = render(<MessageList />);
    mockScrollToBottom.mockClear();

    mockMessages = [
      { id: '1', role: 'user', parts: [{ type: 'text', content: 'Hello' }] },
      { id: '2', role: 'assistant', parts: [{ type: 'text', content: 'Hi' }] }
    ];
    rerender(<MessageList />);

    expect(mockScrollToBottom).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});

describe('When the user is not pinned to the bottom', () => {
  beforeEach(() => {
    mockIsPinnedToBottom = false;
  });

  it('should not call scrollToBottom on mount', () => {
    render(<MessageList />);

    expect(mockScrollToBottom).not.toHaveBeenCalled();
  });

  it('should not call scrollToBottom when new messages arrive', () => {
    mockMessages = [
      { id: '1', role: 'user', parts: [{ type: 'text', content: 'Hello' }] }
    ];

    const { rerender } = render(<MessageList />);

    mockMessages = [
      { id: '1', role: 'user', parts: [{ type: 'text', content: 'Hello' }] },
      { id: '2', role: 'assistant', parts: [{ type: 'text', content: 'Hi' }] }
    ];
    rerender(<MessageList />);

    expect(mockScrollToBottom).not.toHaveBeenCalled();
  });
});

describe('When a MessageItem triggers a content update', () => {
  beforeEach(() => {
    mockMessages = [
      { id: '1', role: 'user', parts: [{ type: 'text', content: 'Hello' }] }
    ];
  });

  it('should call scrollToBottom with auto when pinned to bottom', async () => {
    render(<MessageList />);
    mockScrollToBottom.mockClear();

    await user.click(
      screen.getByRole('button', { name: 'trigger content update' })
    );

    expect(mockScrollToBottom).toHaveBeenCalledWith({ behavior: 'auto' });
  });

  it('should not call scrollToBottom when not pinned to bottom', async () => {
    mockIsPinnedToBottom = false;
    render(<MessageList />);

    await user.click(
      screen.getByRole('button', { name: 'trigger content update' })
    );

    expect(mockScrollToBottom).not.toHaveBeenCalled();
  });
});
