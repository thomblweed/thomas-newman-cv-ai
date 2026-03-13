'use client';

import { InfoIcon } from './components/InfoIcon';

import { Disclosure } from '@/ui/components/disclosure';

export const Disclaimer = () => (
  <div className="rounded border border-alternate/40 bg-dark/40 px-3 py-2 text-sm">
    <Disclosure
      summary={
        <div className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0">
            <InfoIcon />
          </span>
          <span>
            AI responses about Thomas&apos; background may not be fully
            accurate.
          </span>
        </div>
      }
    >
      <p className="text-grey">
        LLM interpretation can be imprecise, so responses may not reflect his
        background exactly. For an accurate, up-to-date CV, contact Thomas
        directly. This chat is a personal learning exercise in working with AI
        on the web.
      </p>
    </Disclosure>
  </div>
);
