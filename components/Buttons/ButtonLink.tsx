import React from 'react';
import Link from 'next/link';

export interface Props {
  text: string;
  additionalClasses: string | null;
}

const ButtonLink = ({ text, additionalClasses }: Props) => {
  return (
    <Link
      href="/#contact"
      className={`nm-button-link py-3.5 px-6 font-bold tracking-wide rounded-2xl nm-shadow ${additionalClasses}`}
    >
      {text}
    </Link>
  );
};

export default ButtonLink;
