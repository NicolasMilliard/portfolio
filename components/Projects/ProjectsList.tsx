import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import github from '../../public/images/icons/github.svg';
import external from '../../public/images/icons/external.svg';

import { projects } from '../../pages/api/projects';

const ProjectsList = () => {
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
              <h3 className="text-4xl mb-8 lg:ml-4 lg:mt-10 xl:mt-20">{project.title}</h3>
              <div className="project-description-box lg:nm-green-bg-color px-8 py-4 rounded-2xl lg:absolute lg:-left-8">
                <div className="project-description-text mb-8">
                  <p>{project.description}</p>
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
                  <div className="flex flex-col items-center ml-4 lg:flex-row">
                    <Link href={project.githubURI} className="mb-4 lg:mb-0 lg:mr-4" target="_blank">
                      <Image src={github} alt={`${project.title} - Github`} />
                    </Link>
                    <Link href={project.projectURI} target="_blank">
                      <Image src={external} alt="Visit the website" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-tools">
            <p className="nm-gray-color">{project.tools}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectsList;
