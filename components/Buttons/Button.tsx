import React from 'react';

export interface Props {
  text: string;
  additionalClasses: string | null;
}

const Button = ({ text, additionalClasses }: Props) => {
  return (
    <button className={`py-3.5 px-6 font-bold tracking-wide rounded-2xl ${additionalClasses}`}>
      {text}
    </button>
  );
};

export default Button;
