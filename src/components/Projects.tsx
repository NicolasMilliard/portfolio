import { Link } from '@tanstack/react-router';

import { projects } from '../data/portfolio';

export const Projects = () => {
  return (
    <section>
      <h2>projects</h2>
      {projects.map((project) => {
        const content = (
          <>
            <span className="project-title">{project.title}</span>
            <span className="project-description">{project.description}</span>
          </>
        );

        return project.internal ? (
          <Link className="project-link" key={project.title} to={project.link}>
            {content}
          </Link>
        ) : (
          <a
            className="project-link"
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        );
      })}
    </section>
  );
};
