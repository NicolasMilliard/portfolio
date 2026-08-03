import { createFileRoute, Link, notFound } from '@tanstack/react-router';

import {
  formatPublishedDate,
  getWriting,
  type Writing,
} from '../content/writings';

export const Route = createFileRoute('/writing/$slug')({
  loader: ({ params }) => {
    const writing = getWriting(params.slug);

    if (!writing) {
      throw notFound();
    }

    return {
      slug: writing.slug,
      title: writing.title,
      description: writing.description,
      publishedAt: writing.publishedAt,
    } satisfies Writing;
  },
  component: WritingPage,
});

function WritingPage() {
  const writingMetadata = Route.useLoaderData();
  const writing = getWriting(writingMetadata.slug);

  if (!writing) {
    throw notFound();
  }

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
            <time className="article-date" dateTime={writing.publishedAt}>
              {formatPublishedDate(writing.publishedAt)}
            </time>
          </header>
          <div className="article-content">
            <Content />
          </div>
        </article>
      </main>
    </div>
  );
}
