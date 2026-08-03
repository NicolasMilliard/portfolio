import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

const RootLayout = () => <Outlet />;

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
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});
