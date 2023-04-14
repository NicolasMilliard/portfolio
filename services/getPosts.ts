import { gql, GraphQLClient } from 'graphql-request';

interface Author {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  }
}

interface FeaturedImage {
  url: string;
}

interface Categories {
  name: string;
  slug: string;
}

interface Post {
  author: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: FeaturedImage;
  categories: Categories;
}

interface PostsConnection {
    node: Post;
}

interface PostsConnectionResponse {
  postsConnection: {
    edges: PostsConnection[]
  }
}

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_API_KEY!;

export const getPosts = async (): Promise<PostsConnection[]> => {
  const query: string = gql`
    query GetPosts {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const client: GraphQLClient = new GraphQLClient(graphqlAPI);

  const result: PostsConnectionResponse = await client.request(query);

  return result.postsConnection.edges;
};
