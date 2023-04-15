import { FC } from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  post: {
    featuredImage: {
      url: string;
    };
    createdAt: string;
    title: string;
    author: {
      name: string;
      photo: {
        url: string;
      };
    };
    slug: string;
  };
}

const FeaturedPostCard: FC<Props> = ({ post }) => {
  return (
    <div className="relative h-80">
      <div className="absolute w-full h-full -z-10 opacity-60 rounded-2xl bg-gradient-200 from-green-100 to-green-900" />
      <div
        className="absolute w-full h-full -z-20 rounded-2xl bg-center bg-cover inline-block"
        style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
      />
      <div className="absolute w-full h-full z-0 flex flex-col pt-10 px-8 items-center">
        <p className="text-white-500 mb-4 text-xs">
          {moment(post.createdAt).format('MMM DD, YYYY')}
        </p>
        <p className="text-white-500 mb-4 font-semibold text-2xl text-center">{post.title}</p>
        <div className="flex items-center absolute bottom-10 w-full justify-center">
          <Image
            alt={post.author.name}
            height={32}
            width={32}
            className="drop-shadow-lg rounded-full"
            src={post.author.photo.url}
          />
          <p className="text-white-500 ml-4 font-medium">{post.author.name}</p>
        </div>
      </div>
      <Link href={`/post/${post.slug}`}>
        <span className="absolute w-full h-full cursor-pointer" />
      </Link>
    </div>
  );
};

export default FeaturedPostCard;
