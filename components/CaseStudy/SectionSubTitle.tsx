import type { FC } from 'react';

interface SectionSubTitleProps {
  children: string;
}

const SectionSubTitle: FC<SectionSubTitleProps> = ({ children }) => {
  return <h3 className="text-xl text-black font-semibold leading-relaxed mb-6">{children}</h3>;
};

export default SectionSubTitle;
