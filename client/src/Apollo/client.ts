import { ApolloClient, NormalizedCacheObject, HttpLink } from '@apollo/client';
import { cache } from '.';

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: httpLink,
  connectToDevTools: true
});

export default client;