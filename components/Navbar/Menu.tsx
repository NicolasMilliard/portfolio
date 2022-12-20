import React from 'react';
import Button from '../Buttons/Button';
import Link from 'next/link';

const Menu = () => {
  return (
    <ul className="flex items-center">
      <Link href="#" className="mr-4 sm:mr-8 nm-link">
        <li>about me</li>
      </Link>
      <Link href="#" className="mr-4 sm:mr-8 nm-link">
        <li>projects</li>
      </Link>
      <Link href="#" className="mr-4 sm:mr-8 nm-link">
        <li>resume</li>
      </Link>
      <Button text="contact me" additionalClasses="" />
    </ul>
  );
};

export default Menu;
