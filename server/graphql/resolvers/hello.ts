import { Resolver, Query } from 'type-graphql';

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return 'yeet'
  }
}

export default HelloResolver;