import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import ToolsList from './ToolsList';
import ProjectImage from './ProjectImage';
import Button from '../Buttons/Button';

import github from '../../public/images/icons/github-yellow.svg';
import external from '../../public/images/icons/external-yellow.svg';

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
          <div className="lg:flex lg:items-center">
            <div className="hidden lg:block lg:mb-8 w-31">
              <ProjectImage
                casestudyURI={project.casestudyURI}
                projectURI={project.projectURI}
                imageURI={project.imageURI}
                imageAlt={project.alt}
              />
            </div>
            <div className="lg:relative">
              <h3 className="font-oswald text-yellow text-4xl mb-8 lg:ml-8 max-w-2xl">
                {t(`${project.title}`)}
              </h3>
              <div className="text-yellow lg:px-8 lg:py-4 rounded-2xl">
                <div className="mb-8">
                  <p className=" max-w-2xl">{t(`${project.description}`)}</p>
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
                    {project.casestudyURI != '' ? (
                      <Button
                        text="Voir l'étude de cas"
                        theme=""
                        link={`/case-study/${project.casestudyURI}`}
                        target="_self"
                      />
                    ) : (
                      <>
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
                      </>
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
