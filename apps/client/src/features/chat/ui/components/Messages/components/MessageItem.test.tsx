import { render, screen } from '@testing-library/react';

import { MessageItem } from './MessageItem';

vi.mock('./AnimatedMarkdownMessage', () => ({
  AnimatedMarkdownMessage: ({ content }: { content: string }) => (
    <div data-testid="animated-markdown">{content}</div>
  )
}));

vi.mock('./ThinkingIndicator', () => ({
  ThinkingIndicator: () => <span>Assistant is thinking</span>
}));

vi.mock('../../MarkdownMessage', () => ({
  MarkdownMessage: ({ content }: { content: string }) => (
    <div data-testid="markdown-message">{content}</div>
  )
}));

type TestMessage = Parameters<typeof MessageItem>[0]['message'];

const makeMessage = (
  role: 'user' | 'assistant',
  parts: TestMessage['parts']
): TestMessage => ({ role, parts }) as TestMessage;

const onContentUpdate = vi.fn();

afterEach(() => {
  onContentUpdate.mockClear();
});

it('should render a user message', () => {
  const message = makeMessage('user', [
    { type: 'text', content: 'Hello there' }
  ]);
  render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

  expect(screen.getByTestId('markdown-message')).toHaveTextContent(
    'Hello there'
  );
});

it('should render an assistant message', () => {
  const message = makeMessage('assistant', [
    { type: 'text', content: 'Hello, I am the assistant' }
  ]);
  render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

  expect(screen.getByTestId('animated-markdown')).toHaveTextContent(
    'Hello, I am the assistant'
  );
});

it('should render nothing when an assistant message has no text parts', () => {
  const message = makeMessage('assistant', [{ type: 'thinking' }]);
  const { container } = render(
    <MessageItem message={message} onContentUpdate={onContentUpdate} />
  );

  expect(container).toBeEmptyDOMElement();
});

it('should render nothing when an assistant message has only whitespace text', () => {
  const message = makeMessage('assistant', [{ type: 'text', content: '   ' }]);
  const { container } = render(
    <MessageItem message={message} onContentUpdate={onContentUpdate} />
  );

  expect(container).toBeEmptyDOMElement();
});

it('should render a thinking indicator for thinking parts', () => {
  const message = makeMessage('assistant', [
    { type: 'thinking' },
    { type: 'text', content: 'I have an answer' }
  ]);
  render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

  expect(screen.getByText('Assistant is thinking')).toBeInTheDocument();
});

it('should use an animated message for assistant text parts', () => {
  const message = makeMessage('assistant', [
    { type: 'text', content: 'Response' }
  ]);
  render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

  expect(screen.getByTestId('animated-markdown')).toBeInTheDocument();
  expect(screen.queryByTestId('markdown-message')).not.toBeInTheDocument();
});

it('should use a plain markdown message for user text parts', () => {
  const message = makeMessage('user', [{ type: 'text', content: 'Question' }]);
  render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

  expect(screen.getByTestId('markdown-message')).toBeInTheDocument();
  expect(screen.queryByTestId('animated-markdown')).not.toBeInTheDocument();
});

it('should render multiple text parts', () => {
  const message = makeMessage('assistant', [
    { type: 'text', content: 'Part one' },
    { type: 'text', content: 'Part two' }
  ]);
  render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

  expect(screen.getAllByTestId('animated-markdown')).toHaveLength(2);
});

it('should render thinking and text parts together for an assistant message', () => {
  const message = makeMessage('assistant', [
    { type: 'thinking' },
    { type: 'text', content: 'Final answer' }
  ]);
  render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

  expect(screen.getByText('Assistant is thinking')).toBeInTheDocument();
  expect(screen.getByTestId('animated-markdown')).toHaveTextContent(
    'Final answer'
  );
});
