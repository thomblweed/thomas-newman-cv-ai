import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import appCss from '../styles.css?url';
import fontCss from '../font.css?url';

import type { ReactNode } from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        title: 'Thomas Newman'
      }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss
      },
      {
        rel: 'stylesheet',
        href: fontCss
      }
    ]
  }),
  shellComponent: RootDocument
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="" className="h-full">
      <head>
        <HeadContent />
      </head>
      <body className="bg-dark text-grey">{children}</body>
      <Scripts />
      <TanStackDevtools
        config={{
          position: 'bottom-left'
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />
          }
        ]}
      />
    </html>
  );
}
