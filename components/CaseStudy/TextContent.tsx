import { FC } from 'react';

interface Props {
  children: string;
}

const TextContent: FC<Props> = ({ children }) => {
  return <p className="mb-6 text-black leading-relaxed">{children}</p>;
};

export default TextContent;
