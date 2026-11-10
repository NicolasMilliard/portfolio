import { useRef } from 'react';
import { useSketchbook } from '../hooks/useSketchbook';

import { FallingLeaves } from 'falling-leaves/react';
import { Connect } from './Connect';
import { Footer } from './Footer';
import { Introduction } from './Introduction';
import { Projects } from './Projects';
import { Writing } from './Writing';

import '../styles/home.css';

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSketchbook(rootRef);

  return (
    <div className="page home-page" ref={rootRef}>
      <main id="main-content" className="home-main">
        <FallingLeaves count={48} />
        <Introduction />
        <Writing />
        <Projects />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}
