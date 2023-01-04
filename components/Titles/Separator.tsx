import React, { FC } from 'react';

export interface Props {
  additionalClasses: string;
}

const Separator: FC<Props> = ({ additionalClasses }) => {
  return <span className={`block nm-separator ${additionalClasses}`}></span>;
};

export default Separator;
