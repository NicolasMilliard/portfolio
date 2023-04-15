import { FC } from 'react';
import Image from 'next/image';

interface Props {
  author: {
    name: string;
    bio: string;
    photo: {
      url: string;
    };
  };
}

const Author: FC<Props> = ({ author }) => {
  return (
    <div className="mt-20 mb-8 p-12 relative rounded-2xl bg-black">
      <div className="absolute left-8 -top-14">
        <Image
          src={author.photo.url}
          alt={author.name}
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <h3 className="text-white-100 my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white-100 text-lg leading-relaxed">{author.bio}</p>
    </div>
  );
};

export default Author;
