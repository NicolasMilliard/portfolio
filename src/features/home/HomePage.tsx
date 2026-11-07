import { useRef } from 'react';

import { About } from './About';
import { Connect } from './Connect';
import { Introduction } from './Introduction';
import { Projects } from './Projects';
import { Writing } from './Writing';
import { useSketchbook } from './useSketchbook';

import './home.css';

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSketchbook(rootRef);

  return (
    <div className="page home-page" id="top" ref={rootRef}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Introduction />
      <main id="main-content" className="home-main" tabIndex={-1}>
        <About />
        <Writing />
        <Projects />
        <Connect />
      </main>
    </div>
  );
}
