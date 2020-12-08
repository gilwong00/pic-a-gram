import { Like } from '../../entities';
import {
  Arg,
  Resolver,
  Mutation,
  InputType,
  Field,
  // UseMiddleware
} from 'type-graphql';
// import { isAuth } from '../../middleware/isAuth';

@InputType()
class LikePostInput {
  @Field()
  post_id: number;

  @Field()
  user_id: number;
}

@Resolver(Like)
class LikeResolver {
  @Mutation(() => Like)
  async like(@Arg('input') input: LikePostInput) {
    try {
      console.log('input', input)
      // if theres an image create new photo as well then take the photo if from the return and add it to the post
      return await Like.create({ ...input }).save();
    } catch (err) {
      throw err;
    }
  }
}

export default LikeResolver;
