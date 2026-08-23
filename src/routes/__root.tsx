import {
  createRootRoute,
  HeadContent,
  Link,
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

const NotFoundPage = () => (
  <div className="page">
    <main className="message-page">
      <section>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Return home</Link>
      </section>
    </main>
  </div>
);

export const Route = createRootRoute({
  head: () => seoToRouteHead(notFoundSeo),
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});
