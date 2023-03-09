import React, { FC } from 'react';
import Link from 'next/link';

export interface Props {
  text: string;
  theme: string | null;
}

const ContactLink: FC<Props> = ({ text, theme }) => {
  switch (theme) {
    case "salmon":
      return (
        <Link
          href="mailto:contact@nicolasmilliard.fr"
          className="bg-salmon text-brown-100 py-3.5 px-6 font-bold tracking-wide rounded-2xl shadow hover:bg-yellow ease-in-out duration-300"
        >
          {text}
        </Link>
      )
    default:
      return (
        <Link
          href="mailto:contact@nicolasmilliard.fr"
          className="bg-yellow text-brown-100 py-3.5 px-6 font-bold tracking-wide rounded-2xl shadow hover:bg-salmon ease-in-out duration-300"
        >
          {text}
        </Link>
      )
  }  
};

export default ContactLink;
