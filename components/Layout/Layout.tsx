import React, { FC, ReactNode } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

export interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <div className="bg-brown-100">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
