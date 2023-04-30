import { FC, useState, useEffect } from 'react';
import Button from '../Buttons/Button';
import Link from 'next/link';
import Image from 'next/image';

import { getRecentPosts } from '../../services/getRecentPosts';

interface Post {
  title: string;
  featuredImage: {
    url: string;
  };
  createdAt: string;
  slug: string;
}

const Blog: FC = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    getRecentPosts().then((result) => {
      setRecentPosts(result);
    });
  }, []);
  return (
    <section className="mx-6 md:mx-auto mb-32 md:mb-48 sm:px-0 md:px-16 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
      <h2 className="text-3xl text-black font-bold leading-relaxed">Blog</h2>
      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        {recentPosts.map((post) => (
          <div
            key={post.slug}
            className="bg-white-100 rounded-2xl pt-4 pb-8 px-6 shadow w-full max-w-sm lg:w-96"
          >
            <h3 className="text-xl text-black font-semibold">
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </h3>
            <Link href={`/post/${post.slug}`}>
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                width={294}
                height={165}
                className="mt-4 mb-8"
              />
            </Link>
            <Button text="Read article" link={`/post/${post.slug}`} target="_self" />
          </div>
        ))}
      </div>
      <div className="flex lg:justify-center mt-10">
        <Button text="Visit the blog" link="/blog" target="_self" />
      </div>
    </section>
  );
};

export default Blog;

export async function getStaticProps() {
  const posts = (await getRecentPosts()) || [];

  return {
    props: { posts },
  };
}
