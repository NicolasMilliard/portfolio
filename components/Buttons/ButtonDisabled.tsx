import type { FC } from 'react';

interface ButtonDisabledProps {
  text: string;
}

const ButtonDisabled: FC<ButtonDisabledProps> = ({ text }) => {
  return (
    <button
      disabled
      className="bg-black bg-opacity-40 text-white-500 py-4 px-6 font-semibold rounded-2xl shadow cursor-not-allowed"
    >
      {text}
    </button>
  );
};

export default ButtonDisabled;
