import { useChatActions, useChatStatus } from '../../context/useChatContext';
import { WarningIcon } from '../WarningIcon';

import { AlertBody } from './components/AlertBody';
import { AlertLayout } from './components/AlertLayout';
import { AlertMessages } from './components/AlertMessages';
import { RetryButton } from './components/RetryButton';
import { formatResetDate, formatRetryTime, isRetryAllowed } from './utils';

import type { ChatErrorCode } from '@/server/response/chatErrorCode';

const errorMessages: Record<ChatErrorCode, string> = {
  rate_limit: 'The AI service is temporarily rate-limited.',
  token_limit: 'The service has reached its usage limit for today.',
  unavailable: 'The AI service is currently unavailable.',
  unknown: 'Something went wrong.'
};

const waitMessages: Record<ChatErrorCode, string | null> = {
  rate_limit: null,
  token_limit: 'Please try again tomorrow.',
  unavailable: 'Please try again in a few minutes.',
  unknown: null
};

export const ChatErrorBanner = () => {
  const { error, kind, retryAt } = useChatStatus();
  const { reload } = useChatActions();

  if (!error || !kind) return null;

  const showRetryButton = kind !== 'token_limit';
  const retryDisabled = !isRetryAllowed(retryAt);
  const waitMessage = waitMessages[kind];

  return (
    <AlertLayout>
      <WarningIcon className="mt-0.5 h-5 w-5 shrink-0" />
      <AlertBody>
        <AlertMessages>
          <p className="font-medium text-bright">{errorMessages[kind]}</p>
          {waitMessage && <p className="text-grey">{waitMessage}</p>}
          {kind === 'rate_limit' && retryAt && (
            <p className="text-grey">
              Try again after{' '}
              <span className="font-medium text-primary">
                {formatRetryTime(retryAt)}
              </span>
              .
            </p>
          )}
          {kind === 'token_limit' && retryAt && (
            <p className="text-grey">
              Estimated reset:{' '}
              <span className="font-medium text-primary">
                {formatResetDate(retryAt)}
              </span>
              .
            </p>
          )}
        </AlertMessages>
        {showRetryButton && (
          <RetryButton
            onClick={reload}
            disabled={retryDisabled}
            className="self-start"
          />
        )}
      </AlertBody>
    </AlertLayout>
  );
};
