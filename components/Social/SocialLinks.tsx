import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import github from '../../public/images/icons/github-yellow.svg';
import linkedin from '../../public/images/icons/linkedin-yellow.svg';
import twitter from '../../public/images/icons/twitter-yellow.svg';

const SocialLinks = () => {
  return (
    <div className="z-30 bottom-0 left-16 fixed hidden 2xl:block">
      <div className="flex flex-col items-center">
        <Link href="https://github.com/NicolasMilliard" className="mb-4" target="_blank">
          <Image src={github} alt="Github" className="social-icon" priority={false} />
        </Link>
        <Link href="https://www.linkedin.com/in/nicolas-milliard/" className="mb-4" target="_blank">
          <Image src={linkedin} alt="LinkedIn" className="social-icon" priority={false} />
        </Link>
        <Link href="https://twitter.com/NicolasMilliard" className="mb-4" target="_blank">
          <Image src={twitter} alt="Twitter" className="social-icon" priority={false} />
        </Link>
        <div className="w-0.5 h-28 bg-yellow"></div>
      </div>
    </div>
  );
};

export default SocialLinks;
