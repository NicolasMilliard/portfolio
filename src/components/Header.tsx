import { Link } from '@tanstack/react-router';
import { DrawnBox } from './SketchMarks';

import type { Profile } from '../data/portfolio';

export const Header = ({ profile }: { profile: Profile }) => {
  return (
    <div className="site-nav">
      <Link
        className="site-identity"
        to="/"
        aria-label={`${profile.name}, home`}
      >
        <img
          className="introduction-logo"
          src="/images/brand/nicolas-face-small.png"
          srcSet="/images/brand/nicolas-face-small.png 96w, /images/brand/nicolas-face.png 256w"
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
  );
};
