import {
  createMemoryHistory,
  RouterProvider,
} from '@tanstack/react-router';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { writings } from './content/writings';
import { createAppRouter } from './router';
import {
  getWritingSeo,
  homeSeo,
  notFoundSeo,
  type PrerenderPage,
} from './seo';

export const getPrerenderPages = (): PrerenderPage[] => [
  {
    path: '/',
    outputFile: 'index.html',
    seo: homeSeo,
    includeInSitemap: true,
  },
  ...writings.map((writing) => ({
    path: `/writing/${writing.slug}`,
    outputFile: `writing/${writing.slug}.html`,
    seo: getWritingSeo(writing),
    includeInSitemap: true,
    lastModified: writing.updatedAt ?? writing.publishedAt,
  })),
  {
    path: '/404',
    outputFile: '404.html',
    seo: notFoundSeo,
    includeInSitemap: false,
  },
];

export const renderPage = async (path: string) => {
  const history = createMemoryHistory({ initialEntries: [path] });
  const router = createAppRouter(history, false);

  await router.load();

  return renderToString(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
};
