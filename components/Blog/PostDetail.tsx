import React, { FC } from 'react';
import moment from 'moment';
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
    <div className="bg-white-100 shadow-lg rounded-lg pb-12">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
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
      </div>
      <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
      <RichText content={post.content.raw} />
    </div>
  );
};

export default PostDetail;
