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

interface PostDetails {
    node: Post;
}

interface PostDetailsResponse {
    // TO DO
}

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_API_KEY!;

export const getPostDetails = async (slug: string): Promise<PostDetails[]> => {
  const query: string = gql`
    query GetPostDetails($slug: String!) {
        post(where: {slug: $slug}) {
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
            content {
                raw
            }
        }
    }
  `;

  const client: GraphQLClient = new GraphQLClient(graphqlAPI);

  const result: any = await client.request(query, {slug});

  return result.post;
};
