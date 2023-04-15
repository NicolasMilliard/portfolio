import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../../Buttons/Button';

import github from '../../../public/images/icons/github.svg';
import twitter from '../../../public/images/icons/twitter.svg';
import linkedin from '../../../public/images/icons/linkedin.svg';

const Menu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Hamburger button */}
      <button className="p-4 flex flex-col items-end gap-1.5 lg:hidden" onClick={toggleMenu}>
        <div className="block w-7 h-3px bg-black rounded"></div>
        <div className="block w-5 h-3px bg-black rounded"></div>
        <div className="block w-7 h-3px bg-black rounded"></div>
      </button>
      {/* Menu */}
      <ul className="hidden lg:flex lg:gap-8">
        <li>
          <Link href="/" className="text-black hover:text-green-500">
            Home
          </Link>
        </li>
        {/* <li>
          <Link href="#" className="text-black hover:text-green-500">
            Projects
          </Link>
        </li> */}
        <li>
          <Link href="/blog" className="text-black hover:text-green-500">
            Blog
          </Link>
        </li>
        {/* <li>
          <Link href="#" className="text-black hover:text-green-500">
            Newsletter
          </Link>
        </li> */}
        <li>
          <Button text="Contact me" link="#" target="_self" />
        </li>
      </ul>

      {/* Floating menu */}
      <div
        className={`fixed w-80 py-10 px-8 text-white-500 bg-gradient-200 from-green-100 to-green-900 rounded-bl-3xl ease-in-out duration-300 ${
          isOpen ? 'right-0 top-0' : '-right-full -top-32'
        }`}
      >
        <div className="flex justify-end">
          <button onClick={toggleMenu} className="relative p-4">
            <div className="absolute top-4 left-0 block w-7 h-3px bg-white-500 rotate-45 rounded"></div>
            <div className="absolute top-4 left-0 block w-7 h-3px bg-white-500 -rotate-45 rounded"></div>
          </button>
        </div>
        {/* Portfolio links */}
        <ul>
          <li className="mb-4">
            <Link href="/" onClick={() => setIsOpen(!isOpen)}>
              Home
            </Link>
          </li>
          {/* <li className="mb-4">
            <Link href="#" onClick={() => setIsOpen(!isOpen)}>Projects</Link>
          </li> */}
          <li className="mb-4">
            <Link href="/blog" onClick={() => setIsOpen(!isOpen)}>
              Blog
            </Link>
          </li>
          {/* <li>
            <Link href="#" onClick={() => setIsOpen(!isOpen)}>Newsletter</Link>
          </li> */}
        </ul>
        <div className="block bg-white-500 w-full h-0.5 my-4 rounded"></div>
        {/* Social links */}
        <ul>
          <li className="flex items-center mb-4">
            <Image src={github} alt="Github - Nicolas Milliard" className="mr-2" />
            <Link href="https://github.com/NicolasMilliard" target="_blank">
              /NicolasMilliard
            </Link>
          </li>
          <li className="flex items-center mb-4">
            <Image src={twitter} alt="Twitter - Nicolas Milliard" className="mr-2" />
            <Link href="https://twitter.com/NicolasMilliard" target="_blank">
              /NicolasMilliard
            </Link>
          </li>
          <li className="flex items-center">
            <Image src={linkedin} alt="LinkedIn - Nicolas Milliard" className="mr-2" />
            <Link href="https://www.linkedin.com/in/nicolas-milliard/" target="_blank">
              /Nicolas-Milliard
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
