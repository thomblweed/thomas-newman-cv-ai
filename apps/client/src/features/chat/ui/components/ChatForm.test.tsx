import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChatForm } from './ChatForm';

const user = userEvent.setup();
const mockSendMessage = vi.fn();
let mockIsLoading = false;

vi.mock('../context/useChatContext', () => ({
  useChatActions: () => ({ sendMessage: mockSendMessage }),
  useChatStatus: () => ({ isLoading: mockIsLoading })
}));

beforeEach(() => {
  mockIsLoading = false;
});

afterEach(() => {
  mockSendMessage.mockClear();
});

it('should focus the input on mount', () => {
  render(<ChatForm />);
  expect(screen.getByRole('textbox')).toHaveFocus();
});

it('should disable the send button when input is empty', () => {
  render(<ChatForm />);
  expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
});

it('should enable the send button when the user types a message', async () => {
  render(<ChatForm />);

  await user.type(screen.getByRole('textbox'), 'Hello');

  expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
});

describe('When the user submits the form by clicking send', () => {
  it('should call sendMessage with the trimmed input', async () => {
    render(<ChatForm />);

    await user.type(screen.getByRole('textbox'), '  Hello  ');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(mockSendMessage).toHaveBeenCalledWith('Hello');
  });

  it('should clear the input', async () => {
    render(<ChatForm />);

    await user.type(screen.getByRole('textbox'), 'Hello');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});

it('should call sendMessage when the user presses Enter', async () => {
  render(<ChatForm />);

  await user.type(screen.getByRole('textbox'), 'Hello{Enter}');

  expect(mockSendMessage).toHaveBeenCalledWith('Hello');
});

it('should not submit the form when the user presses Shift+Enter', async () => {
  render(<ChatForm />);

  const input = screen.getByRole('textbox');
  await user.type(input, 'Hello');
  fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });

  expect(mockSendMessage).not.toHaveBeenCalled();
});

describe('When the input contains only whitespace', () => {
  it('should not call sendMessage when Enter is pressed', async () => {
    render(<ChatForm />);

    await user.type(screen.getByRole('textbox'), '   {Enter}');

    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('should keep the send button disabled', async () => {
    render(<ChatForm />);

    await user.type(screen.getByRole('textbox'), '   ');

    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeDisabled();
  });
});

describe('When the chat is loading', () => {
  beforeEach(() => {
    mockIsLoading = true;
  });

  it('should disable the input', () => {
    render(<ChatForm />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should disable the send button', () => {
    render(<ChatForm />);
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeDisabled();
  });
});

it('should refocus the input when loading finishes', () => {
  mockIsLoading = true;
  const { rerender } = render(<ChatForm />);

  mockIsLoading = false;
  rerender(<ChatForm />);

  expect(screen.getByRole('textbox')).toHaveFocus();
});
