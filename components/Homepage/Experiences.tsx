import { useState } from 'react';

import { experiencesList } from '../../pages/api/experiencesList';

const Experiences = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
      <h2 className="text-3xl text-black font-bold leading-relaxed">Experiences</h2>
      {/* Tabs */}
      <div className="lg:flex lg:gap-20">
        <div className="hidden lg:block lg:min-w-fit lg:mt-6">
          {experiencesList.map((experience, index) => (
            <div
              key={experience.label}
              className={`flex gap-2 hover:opacity-100 ease-in-out duration-300 ${
                activeIndex === index ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div
                className={`w-0.5 h-8 ease-in-out duration-300 ${
                  activeIndex === index ? 'bg-green-500' : 'bg-black'
                }`}
              ></div>
              <button
                className={`block font-semibold text-left ease-in-out duration-300 ${
                  activeIndex === index ? 'text-green-500' : 'text-black'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {experience.label}
              </button>
            </div>
          ))}
        </div>
        {/* Experiences */}
        <div className="max-w-xl">
          {experiencesList.map((experience, index) => (
            <div key={index} className={activeIndex === index ? 'lg:block' : 'lg:hidden'}>
              <div className="mt-6 flex gap-6 items-center">
                <h3 className="text-xl text-green-500 font-semibold leading-relaxed lg:hidden">
                  {experience.label}
                </h3>
                <h3 className="text-xl text-green-500 font-semibold leading-relaxed hidden lg:block">
                  {experience.title}
                </h3>
                <p>{experience.date}</p>
              </div>
              <ul className="list-disc mt-6 ml-6 text-black leading-relaxed">
                {experience.descriptions.map((description) => (
                  <li key={description.id}>{description.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
