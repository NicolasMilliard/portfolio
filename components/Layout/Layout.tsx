import React, { FC, ReactNode, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

export interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
