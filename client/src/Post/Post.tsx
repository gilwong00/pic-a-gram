import { useContext, useState } from 'react';
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
  Paper,
  Grid,
  Divider,
  Typography,
  Collapse,
  makeStyles,
  createStyles
} from '@material-ui/core';
import { formatDate } from 'util/formatDate';
import { CommentInput } from 'CommentInput';

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
            <CardContent>
              <CommentInput
                post={post}
                hideInput={() => setShowCommentInput(false)}
              />
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    </Grid>
  );
};

export default Post;
