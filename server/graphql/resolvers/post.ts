import { Post } from '../../entities';
import {
  Arg,
  // Ctx,
  Resolver,
  //Query,
  Mutation,
  InputType,
  Field,
  UseMiddleware
} from 'type-graphql';
import { isAuth } from '../../middleware/isAuth';

@InputType()
class CreatePostInput {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  user_id: number;
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
}

export default PostResolver;
