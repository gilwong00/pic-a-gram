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
  UseMiddleware
} from 'type-graphql';
import { isAuth } from '../../middleware/isAuth';

const PAGE_LIMIT = 6;

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
  totalPages: number;
}

@Resolver(Post)
class PostResolver {
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async create(@Arg('input') input: CreatePostInput) {
    try {
      // if theres an image create new photo as well then take the photo if from the return and add it to the post
      return await Post.create({ ...input }).save();
    } catch (err) {
      throw err;
    }
  }

  @Query(() => PaginatedPosts)
  @UseMiddleware(isAuth)
  async posts(@Arg('pageNum') pageNum: string) {
    const [result, total] = await Post.findAndCount({
      order: { created_at: 'DESC' },
      take: PAGE_LIMIT,
      skip: +pageNum * PAGE_LIMIT,
      relations: ['likes']
    });

    const totalPages: number = Math.ceil(total / PAGE_LIMIT);

    return {
      results: result,
      totalPages
    };
  }
}

export default PostResolver;
