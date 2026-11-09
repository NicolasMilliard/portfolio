import { projects } from '../data/portfolio';
import { WatercolorWash } from './ui/WatercolorWash';

import '../styles/projects.css';

export const Projects = () => {
  return (
    <section
      id="projects"
      className="projects-section"
      aria-labelledby="projects-heading"
    >
      <div className="section-heading">
        <h2 id="projects-heading">A few things I've made</h2>
        <p>Small tools and bigger experiments. Always something to learn.</p>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <a
            className="project-note"
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            data-watercolor
          >
            <svg
              className="project-paper-edge"
              viewBox="0 0 320 220"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.65"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M3 7Q1 108 4 216M5 3Q154 5 316 2M317 5Q319 112 316 217M7 216Q159 213 318 218"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="project-title">
              <WatercolorWash
                className="project-wash"
                firstPass={{ delay: (index % 3) * 90, duration: 650 }}
                secondPass={{ delay: (index % 3) * 90 + 710, duration: 450 }}
              />
              {project.title}
            </span>
            <span className="project-description">{project.description}</span>
            <span className="project-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <svg
              className="project-arrow"
              viewBox="0 0 36 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 23Q17 12 30 5" pathLength="1" />
              <path d="M18 5L30 4L29 17" pathLength="1" />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
};
