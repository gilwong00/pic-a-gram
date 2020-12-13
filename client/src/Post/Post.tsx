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
      color: blue[500]
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
  post?: any;
}

const Post: React.FC<IProps> = ({ post }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={2} className={classes.post}>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label='avatar' className={classes.avatar}>
                R
              </Avatar>
            }
            title='Shrimp and Chorizo Paella'
            subheader='September 14, 2016'
          />
          <CardMedia
            className={classes.media}
            image='https://i.picsum.photos/id/338/200/300.jpg?hmac=rE5P3WDLKY1VMpd9y_FLo_OKhTzG4_3zCbGjKvgOL5w'
            title='Paella dish'
          />

          <CardActions disableSpacing>
            <IconButton aria-label='like post' className={classes.favoriteIcon}>
              <FavoriteIcon />
            </IconButton>
            <Typography component='p'>12</Typography>
            <IconButton aria-label='like post' className={classes.commentIcon}>
              <ChatBubbleIcon />
            </IconButton>
            <Typography component='p'>12</Typography>
          </CardActions>
          <Link className={classes.viewComments} to={`/post`}>
            View all comments
          </Link>
          <Divider className={classes.divider} />
          <CardContent>
            <Typography variant='body2' color='textPrimary' component='p'>
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
};

export default Post;
