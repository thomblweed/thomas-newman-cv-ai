import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { formatResetDate, formatRetryTime } from './utils';

import { ChatErrorBanner } from './index';

const user = userEvent.setup();

const mockReload = vi.fn();
let mockError: Error | null = null;
let mockKind: 'rate_limit' | 'token_limit' | 'unavailable' | 'unknown' | null =
  null;
let mockRetryAt: Date | null = null;

vi.mock('../../context/useChatContext', () => ({
  useChatStatus: () => ({
    error: mockError,
    kind: mockKind,
    retryAt: mockRetryAt
  }),
  useChatActions: () => ({ reload: mockReload })
}));

beforeEach(() => {
  mockError = new Error('Test error');
  mockKind = 'unknown';
  mockRetryAt = null;
});

afterEach(() => {
  mockReload.mockClear();
});

it('should render nothing when error is null', () => {
  mockError = null;
  const { container } = render(<ChatErrorBanner />);

  expect(container).toBeEmptyDOMElement();
});

it('should render nothing when kind is null', () => {
  mockKind = null;
  const { container } = render(<ChatErrorBanner />);

  expect(container).toBeEmptyDOMElement();
});

describe('When an error is present with a classified kind', () => {
  it('should render an alert with the rate_limit message', () => {
    mockKind = 'rate_limit';
    render(<ChatErrorBanner />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'The AI service is temporarily rate-limited.'
    );
  });

  it('should render an alert with the token_limit message', () => {
    mockKind = 'token_limit';
    render(<ChatErrorBanner />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'The service has reached its usage limit for today.'
    );
  });

  it('should render an alert with the unavailable message', () => {
    mockKind = 'unavailable';
    render(<ChatErrorBanner />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'The AI service is currently unavailable.'
    );
  });

  it('should render an alert with the unknown message', () => {
    mockKind = 'unknown';
    render(<ChatErrorBanner />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Something went wrong.'
    );
  });
});

it('should show the wait message for token_limit', () => {
  mockKind = 'token_limit';
  render(<ChatErrorBanner />);

  expect(screen.getByText('Please try again tomorrow.')).toBeInTheDocument();
});

it('should show the wait message for unavailable', () => {
  mockKind = 'unavailable';
  render(<ChatErrorBanner />);

  expect(
    screen.getByText('Please try again in a few minutes.')
  ).toBeInTheDocument();
});

describe('When rate_limit has a retry time', () => {
  beforeEach(() => {
    mockKind = 'rate_limit';
    mockRetryAt = new Date('2025-03-18T14:30:00Z');
  });

  it('should show the formatted retry time', () => {
    const retryAt = new Date('2025-03-18T14:30:00Z');
    mockRetryAt = retryAt;
    render(<ChatErrorBanner />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      formatRetryTime(retryAt)
    );
  });

  it('should include the "Try again after" text', () => {
    render(<ChatErrorBanner />);

    expect(screen.getByText(/Try again after/)).toBeInTheDocument();
  });
});

describe('When token_limit has a reset date', () => {
  beforeEach(() => {
    mockKind = 'token_limit';
    mockRetryAt = new Date('2025-03-20T00:00:00Z');
  });

  it('should show the formatted reset date', () => {
    const retryAt = new Date('2025-03-20T00:00:00Z');
    mockRetryAt = retryAt;
    render(<ChatErrorBanner />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      formatResetDate(retryAt)
    );
  });

  it('should include the "Estimated reset" text', () => {
    render(<ChatErrorBanner />);

    expect(screen.getByText(/Estimated reset/)).toBeInTheDocument();
  });
});

it('should show the retry button for rate_limit', () => {
  mockKind = 'rate_limit';
  render(<ChatErrorBanner />);

  expect(
    screen.getByRole('button', { name: /try again/i })
  ).toBeInTheDocument();
});

it('should not show the retry button for token_limit', () => {
  mockKind = 'token_limit';
  render(<ChatErrorBanner />);

  expect(
    screen.queryByRole('button', { name: /try again/i })
  ).not.toBeInTheDocument();
});

it('should show the retry button for unavailable', () => {
  mockKind = 'unavailable';
  render(<ChatErrorBanner />);

  expect(
    screen.getByRole('button', { name: /try again/i })
  ).toBeInTheDocument();
});

it('should show the retry button for unknown', () => {
  mockKind = 'unknown';
  render(<ChatErrorBanner />);

  expect(
    screen.getByRole('button', { name: /try again/i })
  ).toBeInTheDocument();
});

it('should disable the retry button when retry is not allowed', () => {
  mockKind = 'rate_limit';
  mockRetryAt = new Date(Date.now() + 60000);
  render(<ChatErrorBanner />);

  expect(screen.getByRole('button', { name: /try again/i })).toBeDisabled();
});

describe('When the user clicks the retry button', () => {
  it('should call reload', async () => {
    mockKind = 'unknown';
    render(<ChatErrorBanner />);

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(mockReload).toHaveBeenCalledTimes(1);
  });
});
