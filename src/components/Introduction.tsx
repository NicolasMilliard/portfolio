import { profile } from '../data/portfolio';

import { Greeting } from './Greeting';
import { Header } from './Header';

export const Introduction = () => (
  <header className="introduction">
    <Header profile={profile} />
    <div className="introduction-body">
      <div className="introduction-copy">
        <Greeting />
        <p className="introduction-lead">
          I'm a Senior Frontend Engineer with ten years of experience.
        </p>
        <p className="introduction-description">
          I work with React, TypeScript, and design systems. I care about how
          interfaces work and how they feel to use.
        </p>
      </div>
      <figure className="introduction-portrait">
        <img
          src="/images/brand/nicolas-portrait-cutout.webp"
          srcSet="/images/brand/nicolas-portrait-small-cutout.webp 320w, /images/brand/nicolas-portrait-cutout.webp 640w"
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
