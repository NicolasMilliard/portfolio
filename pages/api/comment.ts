import { gql, GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

const graphqlAPI: string = process.env.NEXT_PUBLIC_HYGRAPH_API_KEY!;

export default async function comments(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(
        data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}
