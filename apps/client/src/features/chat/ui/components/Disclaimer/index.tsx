'use client';

import * as Popover from '@radix-ui/react-popover';

import { WarningIcon } from './components/WarningIcon';

export const Disclaimer = () => (
  <Popover.Root>
    <Popover.Trigger
      aria-label="AI disclaimer"
      className="cursor-pointer text-primary transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:opacity-60"
    >
      <WarningIcon />
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        side="bottom"
        align="start"
        sideOffset={12}
        alignOffset={-365}
        className="z-50 max-w-sm rounded border border-alternate/40 bg-dark px-4 py-4 text-sm text-grey shadow-focus-glow"
      >
        <p className="font-medium text-bright">
          Answers here are a helpful guide, not a substitute for Thomas&apos;s
          actual CV.
        </p>
        <p className="mt-2 text-grey">
          This AI assistant does its best to represent Thomas&apos;s experience
          accurately, but details may occasionally be incomplete or imprecise.
          For a verified, up-to-date CV please contact Thomas directly.
        </p>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);
