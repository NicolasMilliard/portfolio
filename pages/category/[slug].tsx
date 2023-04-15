import { FC } from 'react';
import { useRouter } from 'next/router';

import { getCategories } from '../../services/getCategories';
import { getCategoryPost } from '../../services/getCategoryPost';

import { PostCard, Categories, Loader } from '../../components/Blog';

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

const CategoryPost: FC<Props> = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="py-32 md:py-48 sm:px-0 md:px-16 mx-6 md:mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post) => (
            <PostCard key={post.node.createdAt} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  console.log(categories);
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
