import type { FC } from 'react';

interface TextContentProps {
  children: string;
}

const TextContent: FC<TextContentProps> = ({ children }) => {
  return <p className="mb-6 text-black leading-relaxed">{children}</p>;
};

export default TextContent;
