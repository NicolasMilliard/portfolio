import type { FC } from 'react';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  link: string;
  target: string;
}

const Button: FC<ButtonProps> = ({ text, link, target }) => {
  return (
    <Link
      href={link}
      className="bg-green-500 text-white-500 py-4 px-6 font-semibold rounded-2xl shadow hover:bg-green-900 ease-in-out duration-300"
      target={target}
    >
      {text}
    </Link>
  );
};

export default Button;
