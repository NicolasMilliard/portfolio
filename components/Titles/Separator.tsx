import React from 'react';

export interface Props {
  additionalClasses: string;
}

const Separator = ({ additionalClasses }: Props) => {
  return <span className={`block nm-separator ${additionalClasses}`}></span>;
};

export default Separator;
