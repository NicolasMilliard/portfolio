import React, { FC } from 'react';

export interface Props {
  tools: string[];
  direction: string;
}

const ToolsList: FC<Props> = ({ tools, direction }) => {
  const list = (direction: string) => {
    switch (direction) {
      case 'col':
        return (
          <div className="flex flex-wrap gap-4 md:flex-col md:gap-0 mb-2">
            {tools.map((tool) => (
              <span key={tool} className="text-yellow">
                {tool}
              </span>
            ))}
          </div>
        );
      default:
        return (
          <div className="flex flex-wrap mb-2 gap-4 lg:gap-10">
            {tools.map((tool) => (
              <span key={tool} className="text-yellow">
                {tool}
              </span>
            ))}
          </div>
        );
    }
  };

  return <>{list(direction)}</>;
};

export default ToolsList;
