import { ApolloClient, InMemoryCache } from '@apollo/client';

export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://venia.magento.com/graphql'
    : 'http://localhost:3001';

const GraphqlClient = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export default GraphqlClient;
