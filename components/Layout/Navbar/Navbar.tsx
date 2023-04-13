import { FC } from 'react';
import Logo from './Logo';
import Menu from './Menu';

const Navbar: FC = () => {
  return (
    <nav className="w-full fixed z-50 top-0 pt-7 pb-4 lg:py-8 shadow bg-white-100">
      <div className="flex items-center justify-between mx-6 md:mx-auto md:px-16 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <Logo />
        <Menu />
      </div>
    </nav>
  );
};

export default Navbar;
