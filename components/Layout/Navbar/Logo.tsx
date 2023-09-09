import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/homepage/nicolas-milliard-logo.svg';

const Logo: FC = () => {
  return (
    <Link href="/" title="Full-Stack & Web 3 Developer - Nicolas Milliard">
      <Image src={logo} alt="Full-Stack & Web 3 Developer - Nicolas Milliard" />
    </Link>
  );
};

export default Logo;
