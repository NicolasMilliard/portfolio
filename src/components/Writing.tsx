import { Link } from '@tanstack/react-router';

import { formatPublishedDate, writings } from '../content/writings';

export const Writing = () => {
  return (
    <section id="writing">
      <h2>writing</h2>
      <ul className="writing-list">
        {writings.map((writing) => (
          <li key={writing.slug}>
            <Link
              className="writing-link"
              to="/writing/$slug"
              params={{ slug: writing.slug }}
            >
              <span
                className="writing-title"
                style={{ viewTransitionName: `writing-title-${writing.slug}` }}
              >
                {writing.title}
              </span>
              <time className="writing-date" dateTime={writing.publishedAt}>
                {formatPublishedDate(writing.publishedAt)}
              </time>
              <span
                className="writing-description"
                style={{
                  viewTransitionName: `writing-description-${writing.slug}`,
                }}
              >
                {writing.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
