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

vi.mock('../../AnswerCard', () => ({
  AnswerCard: ({ role }: { role: { company: string } }) => (
    <div data-testid="answer-card">{role.company}</div>
  )
}));

type TestMessage = Parameters<typeof MessageItem>[0]['message'];

const makeMessage = (
  role: 'user' | 'assistant',
  parts: TestMessage['parts']
): TestMessage => ({ role, parts }) as TestMessage;

const makeRole = (company: string) => ({
  type: 'role',
  company,
  title: 'Senior Frontend Engineer',
  period_start: '2025-07',
  duration_months: 10,
  employment_type: 'full-time',
  tech_stack: ['react'],
  content: '## Responsibilities\n\n### Delivery\n\nShipped new features'
});

const toolCallPart = ({
  name = 'get_roles',
  state = 'complete',
  arguments: args = '{}',
  output
}: {
  name?: string;
  state?: string;
  arguments?: string;
  output?: unknown;
}) =>
  ({
    type: 'tool-call',
    id: 'tool-call-1',
    name,
    arguments: args,
    state,
    output
  }) as TestMessage['parts'][number];

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

it('should render a thinking indicator when an assistant message has only a thinking part', () => {
  const message = makeMessage('assistant', [{ type: 'thinking', content: '' }]);
  render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

  expect(screen.getByText('Assistant is thinking')).toBeInTheDocument();
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
    { type: 'thinking', content: '' },
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
    { type: 'thinking', content: '' },
    { type: 'text', content: 'Final answer' }
  ]);
  render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

  expect(screen.getByText('Assistant is thinking')).toBeInTheDocument();
  expect(screen.getByTestId('animated-markdown')).toHaveTextContent(
    'Final answer'
  );
});

it('should keep the animated message mounted when a leading thinking part is dropped', () => {
  const { rerender } = render(
    <MessageItem
      message={makeMessage('assistant', [
        { type: 'thinking', content: '' },
        { type: 'text', content: 'Streaming answer' }
      ])}
      onContentUpdate={onContentUpdate}
    />
  );

  const mountedAnimatedMessage = screen.getByTestId('animated-markdown');

  rerender(
    <MessageItem
      message={makeMessage('assistant', [
        { type: 'text', content: 'Streaming answer' }
      ])}
      onContentUpdate={onContentUpdate}
    />
  );

  expect(screen.getByTestId('animated-markdown')).toBe(mountedAnimatedMessage);
});

describe('When an assistant message carries a completed get_roles call', () => {
  it('should render one answer card per returned role', () => {
    const message = makeMessage('assistant', [
      toolCallPart({ output: [makeRole('Slice'), makeRole('Ensono')] })
    ]);

    render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

    expect(screen.getAllByTestId('answer-card')).toHaveLength(2);
  });

  it('should render the cards before the assistant prose', () => {
    const message = makeMessage('assistant', [
      toolCallPart({ output: [makeRole('Slice')] }),
      { type: 'text', content: 'Here are the roles' }
    ]);

    render(<MessageItem message={message} onContentUpdate={onContentUpdate} />);

    const card = screen.getByTestId('answer-card');
    const prose = screen.getByTestId('animated-markdown');

    expect(
      card.compareDocumentPosition(prose) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('should render no bubble when the call suppresses every card and has no prose', () => {
    const message = makeMessage('assistant', [
      toolCallPart({
        arguments: '{"sections":[]}',
        output: [makeRole('Slice')]
      })
    ]);

    const { container } = render(
      <MessageItem message={message} onContentUpdate={onContentUpdate} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});

it('should only render an answer card once the get_roles call is complete', () => {
  const { rerender, container } = render(
    <MessageItem
      message={makeMessage('assistant', [
        toolCallPart({ state: 'input-complete' })
      ])}
      onContentUpdate={onContentUpdate}
    />
  );

  expect(container).toBeEmptyDOMElement();

  rerender(
    <MessageItem
      message={makeMessage('assistant', [
        toolCallPart({ output: [makeRole('Slice')] })
      ])}
      onContentUpdate={onContentUpdate}
    />
  );

  expect(screen.getByTestId('answer-card')).toBeInTheDocument();
});

it('should only render answer cards for a get_roles call, not other tools', () => {
  const { rerender } = render(
    <MessageItem
      message={makeMessage('assistant', [
        toolCallPart({ name: 'get_profile', output: { email: 'a@b.com' } })
      ])}
      onContentUpdate={onContentUpdate}
    />
  );

  expect(screen.queryByTestId('answer-card')).not.toBeInTheDocument();

  rerender(
    <MessageItem
      message={makeMessage('assistant', [
        toolCallPart({ output: [makeRole('Slice')] })
      ])}
      onContentUpdate={onContentUpdate}
    />
  );

  expect(screen.getByTestId('answer-card')).toBeInTheDocument();
});
