'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { ReactNode } from 'react';

type MarkdownComponentProps = {
  children?: ReactNode;
};

const components = {
  p: ({ children }: MarkdownComponentProps) => (
    <p className="mb-2 last:mb-0 text-base leading-relaxed text-inherit">
      {children}
    </p>
  ),
  strong: ({ children }: MarkdownComponentProps) => (
    <strong className="font-semibold text-primary">{children}</strong>
  ),
  ul: ({ children }: MarkdownComponentProps) => (
    <ul className="my-2 list-disc pl-6 space-y-2 text-base text-inherit">
      {children}
    </ul>
  ),
  ol: ({ children }: MarkdownComponentProps) => (
    <ol className="my-2 list-decimal pl-6 space-y-2 text-base text-inherit">
      {children}
    </ol>
  ),
  li: ({ children }: MarkdownComponentProps) => (
    <li className="leading-relaxed">{children}</li>
  ),
  h1: ({ children }: MarkdownComponentProps) => (
    <h3 className="mt-4 mb-2 text-base font-semibold text-primary first:mt-0">
      {children}
    </h3>
  ),
  h2: ({ children }: MarkdownComponentProps) => (
    <h2 className="mt-4 mb-2 text-base font-semibold text-primary first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: MarkdownComponentProps) => (
    <h3 className="mt-2 mb-2 text-base font-semibold text-secondary">
      {children}
    </h3>
  ),
  code: ({ children }: MarkdownComponentProps) => (
    <code className="rounded bg-dark/30 px-2 py-2 text-sm text-grey">
      {children}
    </code>
  )
};

type MarkdownMessageProps = {
  content: string;
};

export const MarkdownMessage = ({ content }: MarkdownMessageProps) => (
  <div className="markdown-message">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  </div>
);
