import React, { FC } from 'react';
import Link from 'next/link';

export interface Props {
  text: string;
  theme: string | null;
  link: string;
  target: string;
}

const Button: FC<Props> = ({ text, theme, link, target }) => {
  switch (theme) {
    case 'salmon':
      return (
        <Link
          href={link}
          className="bg-salmon text-brown-100 py-3.5 px-6 font-bold tracking-wide rounded-2xl shadow hover:bg-yellow ease-in-out duration-300"
          target={target}
        >
          {text}
        </Link>
      );
    default:
      return (
        <Link
          href={link}
          className="bg-yellow text-brown-100 py-3.5 px-6 font-bold tracking-wide rounded-2xl shadow hover:bg-salmon ease-in-out duration-300"
          target={target}
        >
          {text}
        </Link>
      );
  }
};

export default Button;
