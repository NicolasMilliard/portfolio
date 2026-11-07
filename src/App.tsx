import { useRef } from 'react';

import { About } from './components/About';
import { Connect } from './components/Connect';
import { Introduction } from './components/Introduction';
import { Projects } from './components/Projects';
import { Writing } from './components/Writing';
import { useSketchbook } from './useSketchbook';

import './home.css';

function App() {
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

export default App;
