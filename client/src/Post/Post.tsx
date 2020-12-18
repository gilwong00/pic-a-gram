import { useContext } from 'react';
import { LikeButton } from '.';
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
  makeStyles,
  createStyles
} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { blue, red } from '@material-ui/core/colors';
import { IPost } from 'Post';
import { AppContext } from 'Context';

const useStyles = makeStyles(() =>
  createStyles({
    post: {
      minHeight: 300
    },
    avatar: {
      backgroundColor: red[500]
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    commentIcon: {
      color: blue[500],
      marginLeft: 15
    },
    divider: {
      marginTop: 10
    },
    viewComments: {
      paddingLeft: 15,
      fontSize: 14
    }
  })
);

interface IProps {
  post: IPost;
}

const Post: React.FC<IProps> = ({ post }) => {
  const { user } = useContext(AppContext);
  const classes = useStyles();
  const date = new Date(+post.created_at);
  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const displayDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    date
  );

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={2} className={classes.post}>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label='avatar' className={classes.avatar}>
                {post.username.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={
              <span className={classes.title}>{post.title.toUpperCase()}</span>
            }
            subheader={displayDate}
          />
          <CardMedia
            className={classes.media}
            image={post?.image?.image_src ?? 'http://placehold.jp/200x200.png'}
            title={post.title}
          />

          <CardActions disableSpacing>
            <LikeButton likes={post.likes} postId={post.id} userId={user?.id} />
            <IconButton aria-label='like post' className={classes.commentIcon}>
              <ChatBubbleIcon />
            </IconButton>
            <Typography component='p'>12</Typography>
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
        </Card>
      </Paper>
    </Grid>
  );
};

export default Post;
