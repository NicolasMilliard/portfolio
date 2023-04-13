import { FC } from 'react';
import { useRouter } from 'next/router';
import { getPosts } from '../../services/getPosts';
import { getPostDetails } from '../../services/getPostDetails';
import { ElementNode } from '@graphcms/rich-text-types';

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from '../../components/Blog';

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
      bio: string;
    };
    slug: string;
    categories: Category[];
    content: {
      raw: {
        children: ElementNode[];
      };
    };
  };
}

interface Category {
  slug: string;
}

const PostDetails: FC<Props> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <section className="py-32 md:py-48 sm:px-0 md:px-16 mx-6 md:mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
