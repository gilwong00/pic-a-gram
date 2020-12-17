import { Post, Image } from '../../entities';
import {
  Arg,
  // Ctx,
  Resolver,
  Query,
  Mutation,
  InputType,
  Field,
  ObjectType,
  UseMiddleware,
  Int
} from 'type-graphql';
import { isAuth } from '../../middleware/isAuth';

const PAGE_LIMIT = 6;

@InputType()
class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Int)
  user_id: string;

  @Field()
  username: string;

  @Field()
  imageSrc?: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Array<Post>;
  @Field()
  totalPages: number;
}

@Resolver(Post)
class PostResolver {
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async create(@Arg('input') input: CreatePostInput) {
    try {
      const payload = {
        ...input,
        user_id: parseInt(input.user_id)
      };
      const newPost = await Post.create({ ...payload }).save();

      if (input.imageSrc) {
        const image = await Image.create({
          image_src: input.imageSrc,
          post_id: newPost.id
        }).save();

        return {
          ...newPost,
          image,
          likes: []
        };
      } else {
        return {
          ...newPost,
          likes: []
        };
      }
    } catch (err) {
      throw err;
    }
  }

  @Query(() => PaginatedPosts)
  @UseMiddleware(isAuth)
  async posts(@Arg('pageNum', () => Int) pageNum: number) {
    const [result, total] = await Post.findAndCount({
      order: { created_at: 'DESC' },
      take: PAGE_LIMIT,
      skip: (pageNum - 1) * PAGE_LIMIT,
      relations: ['likes', 'image']
    });

    const totalPages: number = Math.ceil(total / PAGE_LIMIT);

    return {
      posts: result,
      totalPages
    };
  }
}

export default PostResolver;
