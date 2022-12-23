import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import github from '../../public/images/icons/github.svg';
import linkedin from '../../public/images/icons/linkedin.svg';

const SocialLinks = () => {
  return (
    <div id="social-links-container" className="fixed hidden lg:block">
      <div className="flex flex-col items-center">
        <Link href="https://github.com/NicolasMilliard" className="mb-4" target="_blank">
          <Image src={github} alt="Github" className="social-icon" priority={false} />
        </Link>
        <Link href="https://www.linkedin.com/in/nicolas-milliard/" className="mb-4" target="_blank">
          <Image src={linkedin} alt="LinkedIn" className="social-icon" priority={false} />
        </Link>
        <div id="social-links-bar"></div>
      </div>
    </div>
  );
};

export default SocialLinks;
