import type { FC, ReactNode } from 'react';
import Navbar from './Navbar/Navbar';
import Socials from './Socials/Socials';
import Footer from './Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-white-500">
      <Navbar />
      <Socials />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
