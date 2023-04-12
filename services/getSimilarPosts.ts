import { gql, GraphQLClient } from 'graphql-request';

interface Posts {
    title: string;
    featuredImage: {
        url: string;
    };
    createdAt: string;
    slug: string;
}

interface PostsResponse {
    posts: Posts[]
}

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_API_KEY!;

export const getSimilarPosts = async(categories: string[], slug: string): Promise<Posts[]> => {
    const query: string = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
                last: 3
            ) {
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

    const result: PostsResponse = await client.request(query, {categories, slug});

    return result.posts;
};