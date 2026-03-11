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
    <ul className="my-2 list-disc pl-5 space-y-0.5 text-base text-inherit">
      {children}
    </ul>
  ),
  ol: ({ children }: MarkdownComponentProps) => (
    <ol className="my-2 list-decimal pl-5 space-y-0.5 text-base text-inherit">
      {children}
    </ol>
  ),
  li: ({ children }: MarkdownComponentProps) => (
    <li className="leading-relaxed">{children}</li>
  ),
  h1: ({ children }: MarkdownComponentProps) => (
    <h3 className="mt-3 mb-1 text-base font-semibold text-primary first:mt-0">
      {children}
    </h3>
  ),
  h2: ({ children }: MarkdownComponentProps) => (
    <h2 className="mt-3 mb-1 text-base font-semibold text-primary first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: MarkdownComponentProps) => (
    <h3 className="mt-2 mb-0.5 text-base font-semibold text-secondary">
      {children}
    </h3>
  ),
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
