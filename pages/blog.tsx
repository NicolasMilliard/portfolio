import { FC } from 'react';
import { PostCard, Categories, PostWidget, FeaturedPosts } from '../components/Blog';
import { getPosts } from '../services/getPosts';

interface Props {
  posts: Post[];
}

interface Post {
  node: {
    author: Author;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: FeaturedImage;
    categories: CategoriesList;
  };
  title: string;
}

interface Author {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  };
}

interface FeaturedImage {
  url: string;
}

interface CategoriesList {
  name: string;
  slug: string;
}

const blog: FC<Props> = ({ posts }) => {
  return (
    <div className="py-32 md:py-48 sm:px-0 md:px-16 mx-6 md:mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
      <h1 className="text-3xl text-black font-bold leading-relaxed">Blog</h1>
      <FeaturedPosts />
      <section className="mt-32 md:mb-48 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <h2 className="my-6 text-xl text-black font-semibold leading-relaxed">Latest articles</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post) => (
              <PostCard post={post.node} key={post.node.slug} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky lg:top-24">
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
