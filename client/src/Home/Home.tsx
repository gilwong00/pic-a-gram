import React, { useState } from 'react';
import { IPost, Post } from 'Post';
import { Loading } from 'Loader';
import { useQuery } from '@apollo/client';
import { GET_POST } from 'graphql/post/queries';
import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Fab,
  Theme
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import Pagination from '@material-ui/lab/Pagination';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    container: {
      minHeight: 800,
      height: 'auto',
      padding: 20,
      marginTop: 50,
      [theme.breakpoints.down('md')]: {
        boxShadow: 'none'
      }
    },
    post: {
      minHeight: 300
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    avatar: {
      backgroundColor: red[500]
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    pagination: {
      position: 'absolute',
      bottom: '45%',
      left: '48%',
      [theme.breakpoints.down('md')]: {
        left: '30%',
        bottom: 0
      }
    }
  })
);

const Home = () => {
  const classes = useStyles();
  const [pageNum, setPageNum] = useState<string>('1');
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { pageNum },
    notifyOnNetworkStatusChange: true
  });

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) =>
    setPageNum(value.toString());

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <Paper elevation={5} className={classes.container}>
              <Grid container className={classes.root} spacing={3}>
                {data.posts.results.map((post: IPost) => (
                  <Post key={post.id} post={post} />
                ))}
              </Grid>
              {data?.posts.totalPages > 1 && (
                <Pagination
                  className={classes.pagination}
                  color='primary'
                  count={data?.posts.totalPages}
                  size='large'
                  onChange={handleChange}
                />
              )}
            </Paper>
          </Container>
          <Fab color='primary' aria-label='add' className={classes.fab}>
            <AddIcon />
          </Fab>
        </>
      )}
    </>
  );
};

export default Home;
