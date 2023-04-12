import { FC } from 'react';
import { PostCard, Categories, PostWidget } from '../components/Blog';
import { getPosts } from '../services/getPosts';

export interface Props {
  posts: Post[];
}

export interface Post {
  node: {
    author: Author;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: FeaturedImage;
    categories: Categories;
  };
  title: string;
}

export interface Author {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  };
}

export interface FeaturedImage {
  url: string;
}

export interface Categories {
  name: string;
  slug: string;
}

const blog: FC<Props> = ({ posts }) => {
  return (
    <div className="py-32 md:py-48 sm:px-0 md:px-16 mx-6 md:mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
      <section className="py-32 md:py-48 sm:px-0 md:px-16 mx-6 md:mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl lg:flex lg:items-center lg:justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post) => (
              <PostCard post={post.node} key={post.node.slug} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget categories={['']} slug="" />
              <Categories />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default blog;

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
