import { gql, GraphQLClient } from 'graphql-request';

interface Author {
  name: string;
  photo: {
    url: string;
  }
}

interface FeaturedImage {
  url: string;
}

interface Post {
  author: Author;
  createdAt: string;
  slug: string;
  title: string;
  featuredImage: FeaturedImage;
}

interface PostsConnectionResponse {
  posts: Post[]
}

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_API_KEY!;

export const getFeaturedPosts = async (): Promise<Post[]> => {
  const query: string = gql`
    query GetFeaturedPosts {
      posts(where: {featuredPost: true}) {
        author {
            name
            photo {
                url
            }
        }
        featuredImage {
            url
        }
        title
        slug
        createdAt
      }
    }
  `;

  const client: GraphQLClient = new GraphQLClient(graphqlAPI);

  const result: PostsConnectionResponse = await client.request(query);

  return result.posts;
};
