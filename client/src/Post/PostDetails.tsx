import { useQuery } from '@apollo/client';
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
  makeStyles,
  createStyles
} from '@material-ui/core';
import { Loading } from 'Loader';
import { IComment } from 'Post';

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
    }
  })
);

export const PostDetails = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId: +id }
  });

  return (
    <Container className={classes.container}>
      {loading ? (
        <Loading />
      ) : (
        <Paper elevation={2}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <figure>
                <img
                  className={classes.img}
                  src={data.post.image.image_src}
                  alt=''
                />

                <figcaption>
                  <p>{data.post.content}</p>
                  {/* show likes */}
                </figcaption>
              </figure>
            </Grid>
            {/* comment section */}
            <Grid item xs={6}>
              <List>
                {data.post.comments.map((comment: IComment) => {
                  return (
                    <ListItem key={comment.id} alignItems='flex-start'>
                      <ListItemText
                        primary={comment.comment}
                        secondary={
                          <>
                            <Typography>{comment?.user?.username}</Typography>
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default PostDetails;
