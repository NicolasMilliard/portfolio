import { FC, useState, useEffect } from 'react';
import Logo from './Logo';
import Menu from './Menu';

interface NavbarState {
  height: number;
}

const Navbar: FC = () => {
  const [scrollState, setScrollState] = useState<NavbarState>({ height: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollState((prevState) => ({
        ...prevState,
        height: window.scrollY,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full fixed z-9999 top-0 shadow bg-white-100 duration-200 ${
        scrollState.height > 80 ? 'py-4' : 'py-8'
      }`}
    >
      <div className="flex items-center justify-between mx-6 md:mx-auto md:px-16 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <Logo />
        <Menu />
      </div>
    </nav>
  );
};

export default Navbar;
