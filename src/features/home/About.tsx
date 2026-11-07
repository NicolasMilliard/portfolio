import { Link } from '@tanstack/react-router';

import { profile } from '../../data/portfolio';

import { DrawnUnderline, SketchRuler } from './SketchMarks';

export const About = () => {
  const about = profile.about;

  return (
    <section
      className="home-section about-section"
      id="about"
      aria-labelledby="about-heading"
    >
      <SketchRuler />
      <div className="section-heading">
        <h2 id="about-heading">
          A little
          <br className="desktop-break" /> about me
        </h2>
      </div>
      <div className="about-copy">
        {about.map((item) => (
          <p key={item}>{item}</p>
        ))}
        <p className="personal-note">
          Away from the screen: life in the{' '}
          <span className="handwritten word-note">countryside</span>, a garden,
          chickens, and the occasional{' '}
          <Link
            to="/writing/$slug"
            params={{ slug: 'a-little-automation-for-my-garden' }}
            className="inline-sketch-link"
          >
            Raspberry Pi experiment
            <DrawnUnderline />
          </Link>
          .
        </p>
      </div>
    </section>
  );
};
