import { createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { informationPages } from './content/information';
import { writings } from './content/writings';
import { createAppRouter } from './router';
import {
  getInformationSeo,
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
  ...informationPages.map((page) => ({
    path: page.path,
    outputFile: `${page.path.slice(1)}.html`,
    seo: getInformationSeo(page),
    includeInSitemap: true,
  })),
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
    styleEntry: 'src/features/lost/NotFoundPage.tsx',
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
