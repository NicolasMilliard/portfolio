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
    <div className="relative h-80 mr-4">
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
      </div>
      <Link href={`/post/${post.slug}`}>
        <span className="absolute w-full h-full cursor-pointer" />
      </Link>
    </div>
  );
};

export default FeaturedPostCard;
