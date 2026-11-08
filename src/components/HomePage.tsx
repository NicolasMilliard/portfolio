import { useRef } from 'react';
import { useSketchbook } from '../hooks/useSketchbook';

import { About } from './About';
import { Connect } from './Connect';
import { Introduction } from './Introduction';
import { Projects } from './Projects';
import { Writing } from './Writing';

import '../styles/home.css';

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSketchbook(rootRef);

  return (
    <div className="page home-page" ref={rootRef}>
      <Introduction />
      <main id="main-content" className="home-main">
        <About />
        <Writing />
        <Projects />
        <Connect />
      </main>
    </div>
  );
}
