import {
  createRootRoute,
  HeadContent,
  lazyRouteComponent,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { useEffect } from 'react';

import { Header } from '../components/Header';
import { profile } from '../data/portfolio';
import { notFoundSeo, seoToRouteHead } from '../seo';

const ManagedHead = () => {
  useEffect(() => {
    document.head
      .querySelectorAll('[data-seo-static]')
      .forEach((element) => element.remove());
  }, []);

  return typeof document === 'undefined' ? null : <HeadContent />;
};

const RootLayout = () => {
  const isNotFound = useRouterState({
    select: ({ matches }) =>
      matches.some((match) => match.status === 'notFound' || match._notFound),
  });

  return (
    <>
      <ManagedHead />
      <div className="site-layout">
        {!isNotFound && <Header profile={profile} />}
        <Outlet />
      </div>
    </>
  );
};

export const Route = createRootRoute({
  head: () => seoToRouteHead(notFoundSeo),
  component: RootLayout,
  notFoundComponent: lazyRouteComponent(
    () => import('../features/404/NotFoundPage'),
    'NotFoundPage',
  ),
});
