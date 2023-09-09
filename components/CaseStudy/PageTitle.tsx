import type { FC } from 'react';

interface PageTitleProps {
  children: string;
}

const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return <h1 className="text-5xl text-center text-black font-bold leading-relaxed">{children}</h1>;
};

export default PageTitle;
