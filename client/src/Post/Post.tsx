import { useContext, useState } from 'react';
import { ApolloCache, useMutation } from '@apollo/client';
import { AppContext } from 'Context';
import { IPost, LikeButton, CommentButton } from '.';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Paper,
  Grid,
  Divider,
  Typography,
  Collapse,
  makeStyles,
  createStyles,
  TextField,
  CircularProgress
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { COMMENT_POST } from 'graphql/post/mutations';
import { POST_COMMENT_FRAGMENT } from 'graphql/fragments/post';
import { formatDate } from 'util/formatDate';

const useStyles = makeStyles(() =>
  createStyles({
    post: {
      minHeight: 300
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18
    },
    media: {
      height: 0,
      paddingTop: '56.25%'
    },
    divider: {
      marginTop: 10
    },
    viewComments: {
      paddingLeft: 15,
      fontSize: 14
    },
    commentSection: {
      display: 'flex'
    }
  })
);

interface IProps {
  post: IPost;
}

const Post: React.FC<IProps> = ({ post }) => {
  const { user } = useContext(AppContext);
  const classes = useStyles();
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const [newcomment, setNewComment] = useState<string>('');
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
      setShowCommentInput(false);
    }
  });

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={2} className={classes.post}>
        <Card>
          <CardHeader
            avatar={
              <Avatar
                aria-label='avatar'
                style={{ backgroundColor: user?.avatar_color ?? '' }}
              >
                {post.username.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={
              <span className={classes.title}>{post.title.toUpperCase()}</span>
            }
            subheader={formatDate(post.created_at)}
          />
          <CardMedia
            className={classes.media}
            image={post?.image?.image_src ?? 'http://placehold.jp/200x200.png'}
            title={post.title}
          />
          <CardActions disableSpacing>
            <LikeButton likes={post.likes} postId={post.id} userId={user?.id} />
            <CommentButton
              comments={post.comments}
              handleClick={() => setShowCommentInput(!showCommentInput)}
            />
          </CardActions>
          <Link className={classes.viewComments} to={`/post/${post.id}`}>
            View all comments
          </Link>
          <Divider className={classes.divider} />
          <CardContent>
            <Typography variant='body2' color='textPrimary' component='p'>
              {post.content}
            </Typography>
          </CardContent>
          <Collapse in={showCommentInput} timeout='auto' unmountOnExit>
            {/* maybe move this to its own component */}
            <CardContent>
              <div className={classes.commentSection}>
                <TextField
                  placeholder='Enter a comment'
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewComment(e.target.value)
                  }
                />
                <IconButton
                  onClick={async () =>
                    await comment({
                      variables: {
                        postId: post.id,
                        userId: user?.id,
                        comment: newcomment
                      }
                    })
                  }
                >
                  {commentLoading ? <CircularProgress /> : <SendIcon />}
                </IconButton>
              </div>
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    </Grid>
  );
};

export default Post;
