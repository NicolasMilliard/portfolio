import { createFileRoute, Link, notFound } from '@tanstack/react-router';

import {
  formatPublishedDate,
  loadWriting,
  type WritingWithContent,
} from '../content/writings';
import { getWritingSeo, notFoundSeo, seoToRouteHead } from '../seo';

export const Route = createFileRoute('/writing/$slug')({
  loader: async ({ params }): Promise<WritingWithContent> => {
    const writing = await loadWriting(params.slug);

    if (!writing) {
      throw notFound();
    }

    return writing;
  },
  head: ({ loaderData }) =>
    seoToRouteHead(loaderData ? getWritingSeo(loaderData) : notFoundSeo),
  component: WritingPage,
});

function WritingPage() {
  const writing = Route.useLoaderData();
  const Content = writing.Content;

  return (
    <div className="page article-page">
      <main className="article-main">
        <article className="article">
          <Link className="article-back-link" to="/">
            Back home
          </Link>
          <header className="article-header">
            <h1 className="article-title">{writing.title}</h1>
            <p className="article-description">{writing.description}</p>
            <div className="article-time">
              <time className="article-date" dateTime={writing.publishedAt}>
                {formatPublishedDate(writing.publishedAt)}
              </time>
              {writing.updatedAt &&
              writing.updatedAt !== writing.publishedAt ? (
                <p className="article-date">
                  Updated{' '}
                  <time dateTime={writing.updatedAt}>
                    {formatPublishedDate(writing.updatedAt)}
                  </time>
                </p>
              ) : null}
            </div>
          </header>
          <div className="article-content">
            <Content />
          </div>
        </article>
      </main>
    </div>
  );
}
