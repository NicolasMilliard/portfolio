import { About } from './components/About';
import { Connect } from './components/Connect';
import { Introduction } from './components/Introduction';
import { Writing } from './components/Writing';

import { links, profile } from './data/portfolio';

function App() {
  return (
    <div className="page home-page">
      <Introduction profile={profile} />
      <main>
        <About about={profile.about} />
        {/* <Projects projects={projects} /> */}
        <Writing />
        <Connect links={links} />
      </main>
    </div>
  );
}

export default App;
