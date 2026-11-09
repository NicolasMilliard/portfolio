import { links } from '../data/portfolio';
import {
  conversationStrokes,
  conversationViewBox,
} from './conversationLettering';

import { ArrowSquareOutIcon } from '@phosphor-icons/react';
import { Footer } from './Footer';
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
                <ArrowSquareOutIcon />
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
