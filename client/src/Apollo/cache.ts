import { InMemoryCache } from '@apollo/client';
interface PaginatedPosts {
  results: Array<any>;
  totalPages: number;
}

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: [],
          // probably need a read field to handle pagination
          merge(
            existing: PaginatedPosts,
            incoming: PaginatedPosts
          ): PaginatedPosts {
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
