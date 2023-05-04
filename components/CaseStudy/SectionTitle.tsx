import { FC } from 'react';

interface Props {
  children: string;
  color: string;
  center: boolean;
}

const SectionTitle: FC<Props> = ({ children, color, center }) => {
  let centerClass = '';

  // Transform color into the right class
  if (color === 'green') {
    color = 'text-green-500';
  } else {
    color = 'text-black';
  }

  // Transform center into the right class
  if (center) {
    centerClass = 'text-center';
  }

  return (
    <h2 className={`text-3xl font-semibold leading-relaxed mb-8 ${color} ${centerClass}`}>
      {children}
    </h2>
  );
};

export default SectionTitle;
