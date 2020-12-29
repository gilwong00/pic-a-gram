import { Like } from '../../entities';
import { Arg, Resolver, Mutation, Int, UseMiddleware } from 'type-graphql';
import { isAuth } from '../../middleware/isAuth';

@Resolver(Like)
class LikeResolver {
  @Mutation(() => Like)
  @UseMiddleware(isAuth)
  async like(
    @Arg('postId', () => Int) postId: number,
    @Arg('userId', () => Int) userId: number
  ): Promise<Like> {
    return await Like.create({ post_id: postId, user_id: userId }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async unlike(
    @Arg('postId', () => Int) postId: number,
    @Arg('userId', () => Int) userId: number
  ): Promise<Boolean> {
    try {
      await Like.delete({ post_id: postId, user_id: userId });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default LikeResolver;
