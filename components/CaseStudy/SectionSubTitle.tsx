import { FC } from 'react';

interface Props {
  children: string;
}

const SectionSubTitle: FC<Props> = ({ children }) => {
  return <h3 className="text-xl text-black font-semibold leading-relaxed mb-6">{children}</h3>;
};

export default SectionSubTitle;
