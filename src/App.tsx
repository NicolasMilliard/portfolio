import { About } from './components/About';
import { Connect } from './components/Connect';
import { Introduction } from './components/Introduction';
import { Projects } from './components/Projects';
import { Writing } from './components/Writing';
import { observeSectionReveals } from './lib/observeSectionReveals';

function App() {
  return (
    <div className="page home-page" ref={observeSectionReveals}>
      <Introduction />
      <main>
        <About />
        <Writing />
        <Projects />
        <Connect />
      </main>
    </div>
  );
}

export default App;
