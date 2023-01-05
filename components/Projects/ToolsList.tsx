import React, { FC } from 'react';

export interface Props {
  tools: string[];
}

const ToolsList: FC<Props> = ({ tools }) => {
  return (
    <div className="mb-2 flex gap-2">
      {tools.map((tool) => (
        <span
          key={tool}
          className="nm-black-bg-color nm-white-color opacity-80 hover:opacity-100 py-2 px-4"
        >
          {tool}
        </span>
      ))}
    </div>
  );
};

export default ToolsList;
