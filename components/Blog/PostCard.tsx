import { FC } from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../Buttons/Button';

interface Props {
  key: string;
  post: {
    title: string;
    excerpt: string;
    slug: string;
    createdAt: string;
    featuredImage: {
      url: string;
    };
    author: {
      name: string;
      photo: {
        url: string;
      };
    };
  };
}

const PostCard: FC<Props> = ({ post }) => {
  return (
    <div className="bg-white-100 shadow rounded-2xl">
      <div className="mb-6">
        <Link href={`/post/${post.slug}`}>
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            width={940}
            height={524}
            className="rounded-t-2xl"
          />
        </Link>
      </div>
      <div className="px-6">
        <h2 className="my-6 text-xl text-black font-semibold leading-relaxed">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="block lg:flex text-center items-center  mb-8 w-full">
          <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              height={30}
              width={30}
              className="rounded-full"
            />
            <p className="ml-2 text-lg text-black">{post.author.name}</p>
          </div>
          <div className="font-medium text-black">
            <span>{moment(post.createdAt).format('MMMM DD, YYYY')}</span>
          </div>
        </div>
        <p className="mb-8 text-black">{post.excerpt}</p>
        <div className="flex pb-8">
          <Button text="Continue reading" link={`/post/${post.slug}`} target="_self" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
