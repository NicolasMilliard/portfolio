import React, { FC } from 'react';

export interface Props {
  tools: string[];
}

const ToolsList: FC<Props> = ({ tools }) => {
  return (
    <div className="mb-2 flex flex-wrap gap-10">
      {tools.map((tool) => (
        <span key={tool} className="text-yellow">
          {tool}
        </span>
      ))}
    </div>
  );
};

export default ToolsList;
