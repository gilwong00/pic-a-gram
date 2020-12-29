import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      display: 'block',
      marginTop: '10%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  })
);

const Loading = () => {
  const classes = useStyles();

  return <CircularProgress className={classes.loading} size={100} />;
};

export default Loading;
