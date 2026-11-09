import { links } from '../data/portfolio';
import {
  conversationStrokes,
  conversationViewBox,
} from './conversationLettering';

import { Footer } from './Footer';
import { DrawnExternalLink } from './ui/DrawnExternalLink';
import { DrawnUnderline } from './ui/DrawUnderline';
import { Handwriting } from './ui/Handwriting';
import { SketchRuler } from './ui/SketchRuler';

export const Connect = () => {
  return (
    <section
      className="connect-section"
      id="connect"
      aria-labelledby="connect-heading"
    >
      <div className="connect-content">
        <SketchRuler />
        <img
          className="connect-character"
          src="/images/brand/nicolas-skating-cutout.webp"
          srcSet="/images/brand/nicolas-skating-small-cutout.webp 256w, /images/brand/nicolas-skating-cutout.webp 480w"
          sizes="(max-width: 40rem) 128px, (max-width: 50rem) 160px, 200px"
          width="480"
          height="720"
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
        <div className="connect-copy">
          <h2 id="connect-heading">
            Good things start
            <br />
            with a{' '}
            <span className="handwritten conversation-word" data-handwriting>
              <span className="handwriting-label">conversation.</span>
              <Handwriting
                strokes={conversationStrokes}
                viewBox={conversationViewBox}
              />
            </span>
          </h2>
          <div className="connect-links">
            {links.map((link) => (
              <a
                className="text-link social-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                key={link.label}
              >
                {link.label}
                <DrawnExternalLink />
                <DrawnUnderline />
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
