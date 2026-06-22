import type { Project } from '../data/portfolio';

export const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section>
      <h2>projects</h2>
      {projects.map((project) => (
        <a
          className="project-link"
          key={project.title}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="project-title">{project.title}</span>
          <span className="project-description">{project.description}</span>
        </a>
      ))}
    </section>
  );
};
