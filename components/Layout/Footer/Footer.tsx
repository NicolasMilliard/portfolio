import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../Buttons/Button';

import logo from '../../../public/images/homepage/nicolas-milliard-logo-white.svg';
import github from '../../../public/images/icons/github-green.svg';
import linkedin from '../../../public/images/icons/linkedin-green.svg';

const Footer: FC = () => {
  return (
    <footer className="flex flex-col justify-center items-center py-8 px-6 bg-black text-white-500 text-yellow">
      <div className="flex justify-between items-center mb-8 w-full max-w-xl">
        <Link href="/" title="Full-Stack & Web 3 Developer - Nicolas Milliard">
          <Image src={logo} alt="Full-Stack & Web 3 Developer - Nicolas Milliard" />
        </Link>
        <Button text="Get in touch" link="mailto:contact@nicolasmilliard.fr" target="_self" />
      </div>
      <div className="flex justify-between w-full max-w-xl">
        <ul>
          <Link href="/">
            <li className="mb-4">Home</li>
          </Link>
          {/* <Link href="#">
            <li className="mb-4">Projects</li>
          </Link> */}
        </ul>
        <ul className="text-green-500">
          <li className="flex items-center mb-4">
            <Image src={github} alt="Github - Nicolas Milliard" className="mr-2 lr:mr-4" />
            <Link href="https://github.com/NicolasMilliard" target="_blank">
              /NicolasMilliard
            </Link>
          </li>
          <li className="flex items-center">
            <Image src={linkedin} alt="LinkedIn - Nicolas Milliard" className="mr-2 lr:mr-4" />
            <Link href="https://www.linkedin.com/in/nicolas-milliard/" target="_blank">
              /Nicolas-Milliard
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
