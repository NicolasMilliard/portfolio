import React from 'react';
import Logo from './Logo';
import Menu from './Menu';

const Navbar = () => {
  return (
    <div id="navbar" className='w-full fixed z-50 py-4 nm-shadow'>
      <div className='sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto flex items-center justify-center sm:justify-between'>
          <Logo />
          <Menu />
      </div>
    </div>
  )
}

export default Navbar