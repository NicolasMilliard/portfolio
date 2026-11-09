import { Link, useLocation, useRouter } from '@tanstack/react-router';
import { useRef } from 'react';

import {
  formatPublishedDate,
  type WritingWithContent,
} from '../../content/writings';

import { ArticleHeading } from './ArticleHeading';
import { ArticleSectionNav } from './ArticleSectionNav';

import '../../styles/article.css';
import './writing.css';

export function WritingPage({ writing }: { writing: WritingWithContent }) {
  const Content = writing.Content;
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const historyState = useLocation({ select: (location) => location.state });

  return (
    <div className="page article-page">
      <ArticleSectionNav contentRef={contentRef} articleKey={writing.slug} />
      <main className="article-main">
        <article className="article">
          <Link
            className="article-back-link"
            to="/"
            onClick={(event) => {
              if (
                historyState.homeHistoryIndex === undefined ||
                historyState.homeHistoryIndex >= historyState.__TSR_index ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;

              // Restore the original homepage entry, including its reading position.
              event.preventDefault();
              router.history.go(
                historyState.homeHistoryIndex - historyState.__TSR_index,
              );
            }}
          >
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
