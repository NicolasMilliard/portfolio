import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      title="Blockchain Developer: Nicolas Milliard"
      className="hidden nm-link sm:block"
    >
      <span
        id="logo-firstname"
        className="font-oswald text-salmon text-lg sm:text-xl md:text-2xl lg:text-4xl"
      >
        nicolas
      </span>
      <span
        id="logo-lastname"
        className="font-oswald text-yellow text-lg sm:text-xl md:text-2xl lg:text-4xl"
      >
        milliard
      </span>
    </Link>
  );
};

export default Logo;
