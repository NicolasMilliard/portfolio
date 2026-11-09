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
    // Settle route positions before view-transition snapshots; anchors stay smooth.
    scrollRestorationBehavior: 'instant',
    trailingSlash: 'never',
  });

export type AppRouter = ReturnType<typeof createAppRouter>;

declare module '@tanstack/react-router' {
  interface HistoryState {
    homeHistoryIndex?: number;
  }

  interface Register {
    router: AppRouter;
  }
}
