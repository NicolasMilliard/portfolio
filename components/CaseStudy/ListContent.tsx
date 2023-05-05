import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ListContent: FC<Props> = ({ children }) => {
  return (
    <div className="flex gap-10 ml-6 mb-6 text-black sm:text-base">
      <ul className="list-disc">{children}</ul>
    </div>
  );
};

export default ListContent;
