import { Link } from '@tanstack/react-router';

import { profile } from '../../data/portfolio';

import { Greeting } from './Greeting';
import { DrawnBox } from './SketchMarks';

export const Introduction = () => {
  return (
    <header className="introduction">
      <div className="site-nav">
        <Link
          className="site-identity"
          to="/"
          resetScroll
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
      <div className="introduction-body">
        <div className="introduction-copy">
          <Greeting />
          <p className="introduction-lead">
            I build interfaces that feel simple.
            <br /> And care about the details that make them work.
          </p>
          <p className="introduction-description">
            I’m a {profile.title} working with React and TypeScript, with ten
            years of building for the web.
          </p>
        </div>
        <figure className="introduction-portrait">
          <img
            src="/images/brand/nicolas-portrait-cutout.png"
            srcSet="/images/brand/nicolas-portrait-small-cutout.png 320w, /images/brand/nicolas-portrait-cutout.png 640w"
            sizes="(max-width: 40rem) 36vw, (max-width: 50rem) 208px, 280px"
            width="640"
            height="1129"
            alt="Watercolor character of Nicolas, smiling with his hands in his pockets and a backpack over his shoulder."
            fetchPriority="high"
          />
        </figure>
      </div>
    </header>
  );
};
