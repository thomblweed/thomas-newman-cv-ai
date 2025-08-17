import { createRouter as createTanstackRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

export const createRouter = () =>
  createTanstackRouter({
    routeTree,
    scrollRestoration: true
  });

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
