import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import ToolsList from './ToolsList';

import github from '../../public/images/icons/github.svg';
import external from '../../public/images/icons/external.svg';

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
        <div key={project.id} className="projet-container mb-20">
          <div className="project-details lg:flex">
            <div className="project-image hidden lg:block lg:mb-8">
              <Link href={project.projectURI} target="_blank">
                <Image
                  src={project.imageURI}
                  alt={project.title}
                  width="510"
                  height="340"
                  className="rounded-2xl nm-shadow"
                />
              </Link>
            </div>
            <div className="project-description lg:relative">
              <h3 className="text-4xl mb-8 lg:ml-4 lg:mt-8 xl:mt-16">{t(`${project.title}`)}</h3>
              <div className="project-description-box lg:nm-green-bg-color lg:px-8 lg:py-4 rounded-2xl lg:absolute lg:-left-8">
                <div className="project-description-text mb-8">
                  <p>{t(`${project.description}`)}</p>
                </div>
                <div className="project-description-links flex items-center mb-8 lg:mb-0">
                  <div className="project-image lg:hidden">
                    <Link href={project.projectURI} target="_blank">
                      <Image
                        src={project.imageURI}
                        alt={project.title}
                        width="510"
                        height="340"
                        className="rounded-2xl nm-shadow"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col items-center ml-4 lg:flex-row lg:ml-0">
                    <Link href={project.githubURI} className="mb-4 lg:mb-0 lg:mr-4" target="_blank">
                      <Image
                        src={github}
                        alt={`${project.title} - Github`}
                        className="social-icon"
                      />
                    </Link>
                    <Link href={project.projectURI} target="_blank">
                      <Image src={external} alt="Visit the website" className="social-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToolsList tools={project.tools} />
        </div>
      ))}
    </>
  );
};

export default ProjectsList;
