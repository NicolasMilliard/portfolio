import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

export interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
