import { Comment } from '../../entities';
import { Arg, Resolver, Mutation, Int, UseMiddleware } from 'type-graphql';
import { isAuth } from '../../middleware/isAuth';

@Resolver(Comment)
class CommentResolver {
  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async comment(
    @Arg('postId', () => Int) postId: number,
    @Arg('userId', () => Int) userId: number,
    @Arg('comment', () => String) comment: string
  ): Promise<Comment> {
    return await Comment.create({
      post_id: postId,
      user_id: userId,
      comment
    }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg('commentId', () => Int) commentId: number
  ): Promise<Boolean> {
    try {
      await Comment.delete({ id: commentId });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default CommentResolver;
