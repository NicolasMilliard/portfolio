import type { FC, ReactNode } from 'react';

interface ListContentProps {
  children: ReactNode;
}

const ListContent: FC<ListContentProps> = ({ children }) => {
  return (
    <div className="flex gap-10 ml-6 mb-6 text-black sm:text-base">
      <ul className="list-disc">{children}</ul>
    </div>
  );
};

export default ListContent;
