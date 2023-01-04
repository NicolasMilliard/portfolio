import React, { FC, ReactNode, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Cursor from '../Cursor/Cursor';

export interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }: Props) => {
  const [cursorTop, setCursorTop] = useState(Number);
  const [cursorLeft, setCursorLeft] = useState(Number);

  const mousePos = (e: React.MouseEvent) => {
    setCursorTop(e.pageY);
    setCursorLeft(e.pageX);
  };
  return (
    <div onMouseMove={mousePos}>
      <Cursor top={cursorTop} left={cursorLeft} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
