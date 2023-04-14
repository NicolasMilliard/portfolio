import { FC } from 'react';
import moment from 'moment';
import Link from 'next/link';

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
    <div className="shadow-lg rounded-lg p-0 bg-white-100">
      <div className="relative overflow-hidden pb-80 mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover"
        />
      </div>
      <h2 className="text-center mb-8 cursor-pointer text-3xl">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <img
            src={post.author.photo.url}
            alt={post.author.name}
            height="30px"
            width="30px"
            className="align-middle rounded-full"
          />
          <p className="inline align-middle ml-2 text-lg">{post.author.name}</p>
        </div>
        <div className="font-medium">
          <span>{moment(post.createdAt).format('MMMM DD, YYYY')}</span>
        </div>
      </div>
      <p className="px-4 lg:px-20 mb-8">{post.excerpt}</p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span>Continue reading</span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
