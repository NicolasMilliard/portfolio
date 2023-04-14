import { gql, GraphQLClient } from 'graphql-request';

interface Categories {
    name: string;
    slug: string;
}

interface CategoriesResponse {
    categories: Categories[]
}

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_API_KEY!;

export const getCategories = async(): Promise<Categories[]> => {
    const query = gql`
    query GetCategories {
        categories {
            name
            slug
        }
    }
  `;

    const client: GraphQLClient = new GraphQLClient(graphqlAPI);

    const result: CategoriesResponse = await client.request(query);

    return result.categories;    
};