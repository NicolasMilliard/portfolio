import type { FC } from 'react';

interface SectionTitleProps {
  children: string;
  color: string;
  center: boolean;
}

const SectionTitle: FC<SectionTitleProps> = ({ children, color, center }) => {
  return (
    <h2
      className={`text-3xl font-semibold leading-relaxed mb-8 text-${color}${
        color === 'green' ? '-500' : ''
      } ${center ? 'text-center' : ''}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
