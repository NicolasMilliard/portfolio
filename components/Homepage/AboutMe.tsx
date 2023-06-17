import Image from 'next/image';

import nicolas from '../../public/images/homepage/full-stack-web-3-developer-nicolas-milliard.png';
import technologiesImg from '../../public/images/homepage/technologies-web-2-nicolas-milliard.png';

const AboutMe = () => {
  return (
    <section className="lg:bg-gradient-200 lg:from-green-100 lg:to-green-900">
      <div className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 lg:py-10 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <div className="lg:flex justify-between items-center">
          <div className="max-w-xl">
            <h1 className="text-3xl text-black lg:text-white-500 font-bold leading-relaxed">
              About me
            </h1>
            <p className="my-6 text-black lg:text-white-500 leading-relaxed">
              My interest in web development started back in 2007 when I decided to learn HTML and
              CSS and create a website dedicated to one of my passion: skateboard.
            </p>
            <p className="mb-6 text-black lg:text-white-500 leading-relaxed">
              Fast-forward to today, I've had the privilege of working at several start-ups and big
              companies through my experience as a salary and as a freelance.
            </p>
            <p className="mb-6 text-black lg:text-white-500 leading-relaxed">
              Here are a few technologies I've been working with recently:
            </p>
            <div className="flex gap-10 ml-6 text-black text-sm sm:text-base lg:text-white-500">
              <ul className="list-disc">
                <li className="leading-relaxed">JavaScript (ES6+)</li>
                <li className="leading-relaxed">React JS</li>
                <li className="leading-relaxed">React Native</li>
              </ul>
              <ul className="list-disc">
                <li className="leading-relaxed">TypeScript</li>
                <li className="leading-relaxed">Next JS</li>
                <li className="leading-relaxed">Redux</li>
              </ul>
              <ul className="list-disc">
                <li className="leading-relaxed">Solidity</li>
                <li className="leading-relaxed">Hardhat</li>
                <li className="leading-relaxed">Truffle</li>
              </ul>
            </div>
          </div>
          {/* Image on small screen */}
          <div className="flex justify-center mt-8 lg:hidden lg:mt-0">
            <Image src={nicolas} alt="Front-End & Web 3 Developer - Nicolas Milliard" />
          </div>
          {/* Image on large screen */}
          <div className="hidden lg:flex">
            <Image src={technologiesImg} alt="Technologies used - Nicolas Milliard" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
