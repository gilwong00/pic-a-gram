import { useContext, useState } from 'react';
import {
  IconButton,
  makeStyles,
  createStyles,
  TextField,
  CircularProgress
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { ApolloCache, useMutation } from '@apollo/client';
import { COMMENT_POST } from 'graphql/post/mutations';
import { POST_COMMENT_FRAGMENT } from 'graphql/fragments/post';
import { IPost } from 'Post';
import { AppContext } from 'Context';

interface IProps {
  post: IPost;
  styles?: any;
  hideInput?: () => void;
}

const CommentInput: React.FC<IProps> = ({ post, styles = {}, hideInput }) => {
  const useStyles = makeStyles(() =>
    createStyles({
      commentSection: {
        display: 'flex',
        ...styles
      }
    })
  );
  const { user } = useContext(AppContext);
  const classes = useStyles();
  const [newComment, setNewComment] = useState<string>('');

  const [
    comment,
    { loading: commentLoading, error: commentError }
  ] = useMutation(COMMENT_POST, {
    update(cache: ApolloCache<any>, { data }) {
      const id = `Post:${post.id}`;
      const currentPost = cache.readFragment<IPost>({
        id,
        fragment: POST_COMMENT_FRAGMENT
      });

      if (currentPost) {
        cache.writeFragment({
          id,
          fragment: POST_COMMENT_FRAGMENT,
          data: {
            __typename: 'Post',
            comments: [
              ...(currentPost.comments ?? []),
              { __typename: 'Comment', ...data.comment }
            ]
          }
        });
      }
      setNewComment('');
      if (hideInput) hideInput();
    }
  });

  return (
    <div className={classes.commentSection}>
      <TextField
        placeholder='Enter a comment'
        fullWidth
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewComment(e.target.value)
        }
        value={newComment}
      />
      <IconButton
        onClick={async () =>
          await comment({
            variables: {
              postId: post.id,
              userId: user?.id,
              comment: newComment
            }
          })
        }
      >
        {commentLoading ? <CircularProgress /> : <SendIcon />}
      </IconButton>
    </div>
  );
};

export default CommentInput;
