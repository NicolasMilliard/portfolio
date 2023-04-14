import { gql, GraphQLClient } from 'graphql-request';

interface Comments {
    name: string;
    createdAt: string;
    comment: string;
}

interface CommentsResponse {
    comments: Comments[]
}

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_API_KEY!;

export const getComments = async(slug: string): Promise<Comments[]> => {
    const query = gql`
    query GetComments($slug: String!) {
        comments (where: { post: { slug: $slug } } ) {
            name
            createdAt
            comment
        }
    }
  `;

    const client: GraphQLClient = new GraphQLClient(graphqlAPI);

    const result: CommentsResponse = await client.request(query, { slug });

    return result.comments;    
};