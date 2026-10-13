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
    defaultViewTransition: {
      types: ({ fromLocation, toLocation }) => {
        if (!fromLocation || fromLocation.pathname === toLocation.pathname) {
          return false;
        }

        return fromLocation.pathname === '/' &&
          toLocation.pathname.startsWith('/writing/')
          ? ['article-enter']
          : [];
      },
    },
    scrollRestoration,
    getScrollRestorationKey: (location) =>
      location.pathname === '/'
        ? '/'
        : location.state.__TSR_key || location.href,
    trailingSlash: 'never',
  });

export type AppRouter = ReturnType<typeof createAppRouter>;

declare module '@tanstack/react-router' {
  interface Register {
    router: AppRouter;
  }
}
