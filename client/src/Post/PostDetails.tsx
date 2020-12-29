import { useContext, useEffect } from 'react';
import { LikeButton, CommentButton } from '.';
import { CommentInput } from 'CommentInput';
import { useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_POST } from 'graphql/post/queries';
import {
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  makeStyles,
  createStyles
} from '@material-ui/core';
import { Loading } from 'Loader';
import { IComment } from 'Post';
import { formatDate } from 'util/formatDate';
import { AppContext } from 'Context';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: 40
    },
    img: {
      maxWidth: 500,
      width: 'auto'
    },
    media: {
      height: 0,
      paddingTop: '56.25%'
    },
    wrapper: {
      padding: 20
    },
    listContainer: {
      marginTop: 10,
      paddingRight: 15,
      width: '100%',
      maxWidth: 500,
      maxHeight: 350,
      overflow: 'auto'
    },
    actions: {
      display: 'flex',
      alignItems: 'center'
    }
  })
);

export const PostDetails = () => {
  const { user } = useContext(AppContext);
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [getPost, { loading, error, data }] = useLazyQuery(GET_POST, {
    variables: { postId: +id }
  });

  useEffect(() => {
    if (id) getPost();
  }, [getPost, id]);

  if (loading || !data) return <Loading />;

  return (
    <Container className={classes.container}>
      <Paper elevation={2} className={classes.wrapper}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <figure>
              <img
                className={classes.img}
                src={data.post.image.image_src}
                alt=''
              />

              <figcaption>
                <div className={classes.actions}>
                  <LikeButton
                    likes={data.post.likes}
                    postId={data.post.id}
                    userId={user?.id}
                  />
                  <CommentButton
                    comments={data.post.comments}
                    handleClick={() => {}}
                  />
                </div>
                <p>{data.post.content}</p>
              </figcaption>
            </figure>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={1} className={classes.listContainer}>
              <List>
                {data.post.comments.map((comment: IComment) => {
                  return (
                    <div key={comment.id}>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar
                            aria-label='avatar'
                            style={{
                              backgroundColor: comment.user?.avatar_color ?? ''
                            }}
                          >
                            {comment?.user?.username.charAt(0).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={comment.comment}
                          secondary={
                            <>
                              <Typography component='span'>
                                {formatDate(comment?.created_at)}
                              </Typography>
                            </>
                          }
                        ></ListItemText>
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </div>
                  );
                })}
              </List>
            </Paper>
            <CommentInput post={data.post} styles={{ paddingTop: 20 }} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PostDetails;
