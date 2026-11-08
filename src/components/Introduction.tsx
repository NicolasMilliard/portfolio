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
