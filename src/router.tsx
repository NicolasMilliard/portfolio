import { createRouter } from "@tanstack/react-router";
import type { RouterHistory } from "@tanstack/react-router";

import { isKeyboardInput, prefersReducedMotion } from "./interactionMotion";
import { routeTree } from "./routeTree.gen";

export const createAppRouter = (
  history?: RouterHistory,
  scrollRestoration = true
) => {
  const router = createRouter({
    routeTree,
    history,
    defaultPreload: "intent",
    defaultViewTransition: {
      types: ({ fromLocation, toLocation }) => {
        if (
          isKeyboardInput() ||
          prefersReducedMotion() ||
          !fromLocation ||
          fromLocation.pathname === toLocation.pathname
        ) {
          return false;
        }

        return fromLocation.pathname === "/" &&
          toLocation.pathname.startsWith("/writing/")
          ? ["article-enter"]
          : [];
      },
    },
    scrollRestoration,
    // Settle route positions before view-transition snapshots; anchors stay smooth.
    scrollRestorationBehavior: "instant",
    trailingSlash: "never",
  });

  const viewTransition = router.options.defaultViewTransition;
  router.subscribe("onBeforeNavigate", () => {
    // Also skip snapshots on browsers without support for transition types.
    router.update({
      defaultViewTransition:
        isKeyboardInput() || prefersReducedMotion() ? false : viewTransition,
    });
  });
  return router;
};

export type AppRouter = ReturnType<typeof createAppRouter>;

declare module "@tanstack/react-router" {
  interface HistoryState {
    homeHistoryIndex?: number;
  }

  interface Register {
    router: AppRouter;
  }
}
