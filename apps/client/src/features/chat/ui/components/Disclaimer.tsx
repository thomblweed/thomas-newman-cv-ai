'use client';

import { Disclosure } from '@/ui/components/disclosure';

export const Disclaimer = () => (
  <div className="rounded border border-alternate/40 bg-dark/40 px-3 py-2 text-sm">
    <Disclosure summary="AI responses about Thomas's background may not be fully accurate.">
      <p className="mt-2 text-grey">
        LLM interpretation can be imprecise, so responses may not reflect his
        background exactly.
      </p>
      <p className="mt-2 text-grey">
        For an accurate, up-to-date CV, contact Thomas directly.
      </p>
      <p className="mt-2 text-grey">
        This chat is a personal learning exercise in working with AI on the
        web.
      </p>
    </Disclosure>
  </div>
);
