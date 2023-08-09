import { ApolloClient, InMemoryCache } from '@apollo/client';

const endpoint = process.env.NODE_ENV === 'production' ? 'https://venia.magento.com/graphql' : 'http://localhost:3001';

const DataFetcher = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export default DataFetcher;
