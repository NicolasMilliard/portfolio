import { FC, useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

import { getSimilarPosts } from '../../services/getSimilarPosts';
import { getRecentPosts } from '../../services/getRecentPosts';

interface Props {
  categories: string[];
  slug: string;
}

interface Posts {
  title: string;
  createdAt: string;
  slug: string;
  featuredImage: {
    url: string;
  };
}

const PostWidget: FC<Props> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState<Posts[]>([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result));
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-white-100 p-8 mb-8 rounded-2xl">
      <h3 className="text-xl text-black font-semibold mb-6">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title}>
          <Link href={`/post/${post.slug}`}>
            <Image
              src={post.featuredImage.url}
              alt={post.title}
              width={240}
              height={134}
              className="mb-4"
            />
          </Link>
          <p className="text-black text-xs">{moment(post.createdAt).format('MMMM DD, YYYY')}</p>
          <Link
            href={`/post/${post.slug}`}
            className="text-black underline hover:text-green-500 duration-100"
          >
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
