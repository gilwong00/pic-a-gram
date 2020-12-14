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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { blue, red } from '@material-ui/core/colors';
import { IPost } from 'Post';

const useStyles = makeStyles(() =>
  createStyles({
    post: {
      minHeight: 300
    },
    avatar: {
      backgroundColor: red[500]
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    favoriteIcon: {
      color: red[500]
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
  const classes = useStyles();
  const totalLikes = post.likes.length;
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
            title={post.title}
            subheader={displayDate}
          />
          <CardMedia
            className={classes.media}
            image={post?.image?.image_src ?? 'http://placehold.jp/200x200.png'}
            title={post.title}
          />

          <CardActions disableSpacing>
            <IconButton aria-label='like post' className={classes.favoriteIcon}>
              {totalLikes > 0 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            {totalLikes > 0 && (
              <Typography component='p'>{totalLikes}</Typography>
            )}
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
