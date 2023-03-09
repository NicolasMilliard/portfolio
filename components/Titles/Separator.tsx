import React, { FC } from 'react';

export interface Props {
  additionalClasses: string;
}

const Separator: FC<Props> = ({ additionalClasses }) => {
  return <span className={`block mt-2 h-0.5 rounded-sm ${additionalClasses}`}></span>;
};

export default Separator;
