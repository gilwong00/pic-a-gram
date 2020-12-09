import { Post } from '../../entities';
import {
  Arg,
  // Ctx,
  Resolver,
  Query,
  Mutation,
  InputType,
  Field,
  ObjectType,
  // UseMiddleware
} from 'type-graphql';
// import { isAuth } from '../../middleware/isAuth';

@InputType()
class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  user_id: number;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  results: Array<Post>;
  @Field()
  total: number;
}

@Resolver(Post)
class PostResolver {
  @Mutation(() => Post)
  // @UseMiddleware(isAuth)
  async create(@Arg('input') input: CreatePostInput) {
    try {
      // if theres an image create new photo as well then take the photo if from the return and add it to the post
      return await Post.create({ ...input }).save();
    } catch (err) {
      throw err;
    }
  }

  @Query(() => PaginatedPosts)
  // @UseMiddleware(isAuth)
  async posts(@Arg('skip') skip: number) {
    const [result, total] = await Post.findAndCount({
      order: { created_at: 'DESC' },
      take: 10,
      skip: (skip || 0) * 10,
      relations: ['likes'],
    });

    return {
      results: result,
      total,
    };
  }
}

export default PostResolver;
