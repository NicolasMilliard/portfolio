import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import github from '../../public/images/icons/github.svg';
import linkedin from '../../public/images/icons/linkedin.svg';

const SocialLinks = () => {
  return (
    <div id="social-links-container" className="fixed hidden sm:block">
      <div className="flex flex-col items-center">
        <Link href="#" className="mb-4">
          <Image src={github} alt="Github" />
        </Link>
        <Link href="#" className="mb-4">
          <Image src={linkedin} alt="LinkedIn" />
        </Link>
        <div id="social-links-bar"></div>
      </div>
    </div>
  );
};

export default SocialLinks;
