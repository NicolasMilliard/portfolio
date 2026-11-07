import { projects } from '../../data/portfolio';

export const Projects = () => {
  return (
    <section
      id="projects"
      className="home-section"
      aria-labelledby="projects-heading"
    >
      <div className="section-heading">
        <p className="eyebrow">Projects</p>
        <h2 id="projects-heading">
          A few things
          <br className="desktop-break" /> I’ve made
        </h2>
        <p>Small tools and bigger experiments. Always something to learn.</p>
      </div>
      <div className="project-list">
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
            <span className="row-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};
