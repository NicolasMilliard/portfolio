import { useRef } from 'react';
import { useSketchbook } from '../hooks/useSketchbook';
import { profile } from '../data/portfolio';

import { Connect } from './Connect';
import { Header } from './Header';
import { Introduction } from './Introduction';
import { Projects } from './Projects';
import { Writing } from './Writing';

import '../styles/home.css';

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSketchbook(rootRef);

  return (
    <div className="page home-page" ref={rootRef}>
      <Header profile={profile} />
      <Introduction />
      <main id="main-content" className="home-main">
        <Writing />
        <Projects />
        <Connect />
      </main>
    </div>
  );
}
