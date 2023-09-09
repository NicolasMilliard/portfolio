import type { FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button, ButtonDisabled } from '../components/Buttons';
import { projectsList } from './api/projectsList';

const CaseStudies: FC = () => {
  return (
    <>
      <Head>
        <title>Case Studies - Nicolas Milliard</title>
        <meta
          name="description"
          content="Case Studies of Nicolas Milliard, Front-End & Web 3 Developer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="py-32 md:py-48 sm:px-0 md:px-16 mx-6 md:mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <div className="max-w-xl">
          <h1 className="text-3xl text-black font-bold leading-relaxed">Case Studies</h1>
          <p className="mb-6 text-black leading-relaxed">
            Find all my relevant projects here. <em>[This section is still in progress]</em>
          </p>
        </div>
        <div className="mt-6">
          {projectsList.map((project) => (
            <div key={project.title} className="mb-10">
              <h3 className="text-xl text-green-500 font-semibold leading-relaxed">
                {project.title}
              </h3>
              <div className="lg:flex lg:items-center">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="my-4 w-342px h-48 lg:w-480px lg:h-270px rounded-2xl"
                />
                <div className="max-w-xl lg:ml-8">
                  <p className="mb-4 text-black leading-relaxed">{project.description}</p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 mb-8 font-semibold text-green-900">
                    {project.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                  {project.active ? (
                    <Button text="Case study" link={project.link} target="_self" />
                  ) : (
                    <ButtonDisabled text="Case study" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
