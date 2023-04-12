import { FC, useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';

import { getSimilarPosts } from '../../services/getSimilarPosts';
import { getRecentPosts } from '../../services/getRecentPosts';

export interface Props {
  categories: string[];
  slug: string;
}

export interface Posts {
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

  console.log(relatedPosts);

  return (
    <div className="bg-white-100 p-8 mb-8">
      <h3 className="text-xl">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post) => (
        <div key={post.title}>
          <div>
            <img src={post.featuredImage.url} alt={post.title} height="60px" width="60px" />
          </div>
          <div>
            <p>{moment(post.createdAt).format('MMMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
