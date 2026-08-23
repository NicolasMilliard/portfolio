import { createRouter, type RouterHistory } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

export const createAppRouter = (
  history?: RouterHistory,
  scrollRestoration = true,
) =>
  createRouter({
    routeTree,
    history,
    defaultPreload: 'intent',
    scrollRestoration,
    trailingSlash: 'never',
  });

export type AppRouter = ReturnType<typeof createAppRouter>;

declare module '@tanstack/react-router' {
  interface Register {
    router: AppRouter;
  }
}
