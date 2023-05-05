import { FC } from 'react';

interface Props {
  children: string;
}

const PageTitle: FC<Props> = ({ children }) => {
  return <h1 className="text-5xl text-center text-black font-bold leading-relaxed">{children}</h1>;
};

export default PageTitle;
