import Link from 'next/link';
import Image from 'next/image';
import Button from '../Buttons/Button';

import nicolas from '../../public/images/homepage/full-stack-web-3-developer-nicolas-milliard.png';

const Introduction = () => {
  return (
    <section className="py-32 md:py-48 sm:px-0 md:px-16 mx-6 md:mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl lg:flex lg:items-center lg:justify-between">
      {/* Text */}
      <div className="max-w-xl">
        <h1 className="text-3xl text-black font-bold leading-relaxed">
          Hello, I'm Nicolas Milliard!
        </h1>
        <h2 className="my-6 text-xl text-green-500 font-semibold leading-relaxed">
          Full-Stack & Web 3 Developer
        </h2>
        <p className="mb-6 text-black leading-relaxed">
          I'm a <span className="font-semibold">7+ years experienced Full-Stack Developer</span>. I
          usually work with React JS, Next JS or Vue in JavaScript (ES6) or in TypeScript.
        </p>
        <p className="mb-6 text-black leading-relaxed">
          I'm also <span className="font-semibold">1+ year experienced Blockchain Developer</span>.
          I've made several Web 3 projects using Solidity Smart Contracts, Hardhat, Ethers.js, The
          Graph...
        </p>
        <div className="mt-8">
          <Button text="Contact me" link="mailto:contact@nicolasmilliard.fr" target="_self" />
          <Link
            href="/images/resume/resume-nicolas-milliard.pdf"
            target="_blank"
            title="Check my resume"
            className="underline text-green-500 hover:text-green-900 ml-8"
          >
            Resume
          </Link>
        </div>
      </div>
      {/* Image */}
      <div className="hidden lg:block lg:relative lg:w-80 lg:h-80">
        <div className="absolute z-20 w-80 h-80 top-0 hover:-top-2 left-0 hover:-left-2 ease-in-out duration-300">
          <Image
            src={nicolas}
            alt="Full-Stack & Web 3 Developer - Nicolas Milliard"
            className="rounded-2xl"
          />
        </div>
        <div className="absolute z-10 w-80 h-80 top-0 left-0 bg-green-900 rounded-2xl"></div>
      </div>
    </section>
  );
};

export default Introduction;
