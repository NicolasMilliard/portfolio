import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import ToolsList from './ToolsList';
import ProjectImage from './ProjectImage';

import github from '../../public/images/icons/github-brown.svg';
import external from '../../public/images/icons/external-brown.svg';

import { projects } from '../../pages/api/projects';

const ProjectsList = () => {
  const [hydrated, setHydrated] = useState(false);
  const { t } = useTranslation('projects');

  useEffect(() => {
    setHydrated(true);
  }, [hydrated]);

  // Returns null on first render so server and client match
  if (!hydrated) {
    return null;
  }

  return (
    <>
      {projects.map((project) => (
        <div key={project.id} className="mb-20">
          <div className="lg:flex">
            <div className="hidden lg:block lg:mb-8 w-31">
              <ProjectImage
                casestudyURI={project.casestudyURI}
                projectURI={project.projectURI}
                imageURI={project.imageURI}
                imageAlt={project.alt}
              />
            </div>
            <div className="lg:relative">
              <h3 className="font-oswald text-yellow text-4xl mb-8 lg:ml-4 lg:mt-8 xl:mt-16 project-description-text">
                {t(`${project.title}`)}
              </h3>
              <div className="text-yellow lg:bg-yellow lg:text-brown-100 lg:px-8 lg:py-4 rounded-2xl lg:absolute lg:-left-8">
                <div className="mb-8">
                  <p className="project-description-text">{t(`${project.description}`)}</p>
                </div>
                <div className="flex items-center mb-8 lg:mb-0">
                  <div className="lg:hidden">
                    <ProjectImage
                      casestudyURI={project.casestudyURI}
                      projectURI={project.projectURI}
                      imageURI={project.imageURI}
                      imageAlt={project.alt}
                    />
                  </div>
                  <div className="flex flex-col items-center ml-4 lg:flex-row lg:ml-0">
                    {project.githubURI != '' && (
                      <Link
                        href={project.githubURI}
                        className="mb-4 lg:mb-0 lg:mr-4"
                        target="_blank"
                      >
                        <Image
                          src={github}
                          alt={`${project.title} - Github`}
                          className="social-icon"
                        />
                      </Link>
                    )}
                    {project.projectURI != '' && (
                      <Link href={project.projectURI} target="_blank">
                        <Image src={external} alt="Visit the website" className="social-icon" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToolsList tools={project.tools} direction="" />
        </div>
      ))}
    </>
  );
};

export default ProjectsList;
