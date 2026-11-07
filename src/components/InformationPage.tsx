import { Link } from '@tanstack/react-router';

import type { InformationPage as InformationPageContent } from '../content/information';

import './article.css';

export function InformationPage({ page }: { page: InformationPageContent }) {
  return (
    <div className="page article-page">
      <main className="article-main">
        <article className="article">
          <Link className="article-back-link" to="/">
            Back home
          </Link>
          <header className="article-header">
            <h1 className="article-title">{page.title}</h1>
          </header>
          <div className="article-content">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="information-links" role="list">
              {page.links.map(({ label, href }) => (
                <li key={href}>
                  <a className="social-link" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
}
