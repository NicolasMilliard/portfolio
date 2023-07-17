import { FC, ReactNode } from 'react';
import Navbar from './Navbar/Navbar';
import Socials from './Socials/Socials';
import Footer from './Footer/Footer';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }: Props) => {
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
