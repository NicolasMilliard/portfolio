import {
  createRootRoute,
  HeadContent,
  lazyRouteComponent,
  Outlet,
} from '@tanstack/react-router';
import { useEffect } from 'react';

import { notFoundSeo, seoToRouteHead } from '../seo';

const ManagedHead = () => {
  useEffect(() => {
    document.head
      .querySelectorAll('[data-seo-static]')
      .forEach((element) => element.remove());
  }, []);

  return typeof document === 'undefined' ? null : <HeadContent />;
};

const RootLayout = () => (
  <>
    <ManagedHead />
    <Outlet />
  </>
);

export const Route = createRootRoute({
  head: () => seoToRouteHead(notFoundSeo),
  component: RootLayout,
  notFoundComponent: lazyRouteComponent(
    () => import('../features/lost/NotFoundPage'),
    'NotFoundPage',
  ),
});
