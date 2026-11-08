import { Link } from '@tanstack/react-router';

import { links, profile } from '../data/portfolio';

import { Companions } from './Companions';
import {
  conversationStrokes,
  conversationViewBox,
} from './conversationLettering';
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
          <p className="eyebrow">Let's connect</p>
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
                <span aria-hidden="true">↗</span>
                <DrawnUnderline />
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer>
        <div className="site-footer">
          <p>
            {profile.name}
            <span aria-hidden="true"> · </span>
            <span>Thanks for stopping by.</span>
          </p>
          <Link to="/privacy">Privacy</Link>
        </div>
        <Companions />
      </footer>
    </section>
  );
};
