import React, { FC } from 'react';
import moment from 'moment';
import Image from 'next/image';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { ElementNode } from '@graphcms/rich-text-types';

interface Props {
  post: {
    title: string;
    createdAt: string;
    featuredImage: {
      url: string;
    };
    author: {
      photo: {
        url: string;
      };
      name: string;
    };
    content: {
      raw: {
        children: ElementNode[];
      };
    };
  };
}

const PostDetail: FC<Props> = ({ post }) => {
  return (
    <div className="bg-white-100 shadow-lg rounded-2xl shadow pb-12">
      <div className="mb-6">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          width={666}
          height={371}
          className="rounded-t-2xl"
        />
      </div>
      <div className="px-6">
        <div className="flex justify-center items-center mb-8 w-full">
          <div className="flex items-center w-full lg:w-auto mr-8">
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="ml-4 lg:text-lg text-black">{post.author.name}</p>
          </div>
          <div className="text-black font-medium">
            <span>{moment(post.createdAt).format('MMMM DD, YYYY')}</span>
          </div>
        </div>
      </div>
      <h1 className="mb-8 text-3xl text-black font-semibold px-6">{post.title}</h1>
      <div className="px-6 text-black">
        <RichText
          content={post.content.raw}
          renderers={{
            h2: ({ children }) => (
              <h2 className="text-2xl text-black font-semibold mb-6">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl text-black font-semibold mb-6">{children}</h3>
            ),
            p: ({ children }) => <p className="text-black leading-relaxed mb-6">{children}</p>,
            code: ({ children }) => (
              <code className="bg-green-100 bg-opacity-20 px-2 rounded-lg border-2 border-green-100/40">
                {children}
              </code>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default PostDetail;
