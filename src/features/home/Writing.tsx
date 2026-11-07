import { Link } from '@tanstack/react-router';

import { formatPublishedDate, writings } from '../../content/writings';

export const Writing = () => {
  return (
    <section
      id="writing"
      className="home-section"
      aria-labelledby="writing-heading"
    >
      <div className="section-heading">
        <p className="eyebrow">Writing</p>
        <h2 id="writing-heading">
          Notes from
          <br className="desktop-break" /> the workbench
        </h2>
        <p>
          Things I’ve tried, problems I’ve untangled, and what I learned along
          the way.
        </p>
      </div>
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
              <span className="row-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
