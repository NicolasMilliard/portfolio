import { Link } from '@tanstack/react-router';
import { useRef } from 'react';

import {
  formatPublishedDate,
  type WritingWithContent,
} from '../content/writings';

import { ArticleHeading } from './ArticleHeading';
import { ArticleSectionNav } from './ArticleSectionNav';

import './article.css';

export function WritingPage({ writing }: { writing: WritingWithContent }) {
  const Content = writing.Content;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="page article-page">
      <ArticleSectionNav contentRef={contentRef} articleKey={writing.slug} />
      <main className="article-main">
        <article className="article">
          <Link className="article-back-link" to="/">
            Back home
          </Link>
          <header className="article-header">
            <h1
              className="article-title"
              style={{ viewTransitionName: `writing-title-${writing.slug}` }}
            >
              {writing.title}
            </h1>
            <p
              className="article-description"
              style={{
                viewTransitionName: `writing-description-${writing.slug}`,
              }}
            >
              {writing.description}
            </p>
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
          <div className="article-content" ref={contentRef}>
            <Content components={{ h2: ArticleHeading }} />
          </div>
        </article>
      </main>
    </div>
  );
}
