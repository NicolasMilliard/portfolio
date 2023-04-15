import { gql, GraphQLClient } from 'graphql-request';

interface Post {
    title: string;
    featuredImage: {
        url: string;
    };
    createdAt: string;
    slug: string;
}

interface PostsResponse {
    posts: Post[]
}

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_API_KEY!;

export const getRecentPosts = async(): Promise<Post[]> => {
    const query = gql`
        query GetRecentPosts {
            posts(last: 3, orderBy: createdAt_ASC) {
            title
            featuredImage {
                url
            }
            createdAt
            slug
        }
    }
  `;

    const client: GraphQLClient = new GraphQLClient(graphqlAPI);

    const result: PostsResponse = await client.request(query);

    return result.posts;
    
};