import { InMemoryCache } from '@apollo/client';

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: [],
          merge(existing, incoming) {
            return [...(existing ?? []), ...incoming];
          }
        }
      }
    },
  }
});

export default cache;