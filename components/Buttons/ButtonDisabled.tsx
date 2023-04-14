import { FC } from 'react';

interface Props {
  text: string;
}

const ButtonDisabled: FC<Props> = ({ text }) => {
  return (
    <span className="bg-black bg-opacity-40 text-white-500 py-4 px-6 font-semibold rounded-2xl shadow cursor-not-allowed">
      {text}
    </span>
  );
};

export default ButtonDisabled;
