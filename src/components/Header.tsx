import { Link } from '@tanstack/react-router';
import { DrawnBox } from './ui/DrawnBox';

import type { Profile } from '../data/portfolio';

export const Header = ({ profile }: { profile: Profile }) => {
  return (
    <header className="site-header">
      <svg
        className="site-header-outline"
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M4 3Q2 37 5 78" vectorEffect="non-scaling-stroke" />
        <path d="M2 6Q240 2 501 5T998 5" vectorEffect="non-scaling-stroke" />
        <path d="M996 2Q999 39 996 77" vectorEffect="non-scaling-stroke" />
        <path
          d="M12 77Q290 74 510 77T999 75"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="site-nav">
        <Link
          className="site-identity"
          to="/"
          onClick={(event) => {
            if (
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            )
              return;
            // Bypass section restoration; CSS handles smooth and reduced motion scrolling.
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
          aria-label={`${profile.name}, home`}
        >
          <img
            className="introduction-logo"
            src="/images/brand/nicolas-face-small.webp"
            srcSet="/images/brand/nicolas-face-small.webp 96w, /images/brand/nicolas-face.webp 256w"
            sizes="44px"
            width="44"
            height="44"
            alt=""
            aria-hidden="true"
          />
          <span>{profile.name}</span>
        </Link>
        <nav aria-label="Main navigation">
          <a href="#writing">
            Writing
            <DrawnBox />
          </a>
          <a href="#projects">
            Projects
            <DrawnBox />
          </a>
          <a href="#connect">
            Say hello
            <DrawnBox />
          </a>
        </nav>
      </div>
    </header>
  );
};
