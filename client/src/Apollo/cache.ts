import { InMemoryCache } from '@apollo/client';
import { IPaginatedPosts } from 'Post';

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: [],
          // probably need a read field to handle pagination
          merge(
            existing: IPaginatedPosts | undefined,
            incoming: IPaginatedPosts
          ): IPaginatedPosts {
            return {
              ...incoming,
              results: [...(existing?.results ?? []), ...incoming.results]
            };
          }
        }
      }
    }
  }
});

export default cache;
