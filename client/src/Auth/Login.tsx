import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/user/mutations';
import {
  Paper,
  FormControl,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 50,
      height: 180,
    },
    field: {
      paddingTop: 15,
      paddingBottom: 20,
    },
  })
);

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const classes = useStyles();
  const history = useHistory();
  const [login, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN,
    {
      update() {
        setUsername('');
        setPassword('');
        history.push('/');
      },
    }
  );

  return (
    <Paper className={classes.formWrapper} variant='outlined' elevation={3}>
      <FormControl fullWidth={true} className={classes.field}>
        <TextField
          placeholder='Username'
          value={username}
          type='text'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl fullWidth={true} className={classes.field}>
        <TextField
          placeholder='Password'
          value={password}
          type='password'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl fullWidth={true}>
        <Button
          variant='contained'
          color='primary'
          disabled={!username || !password}
          onClick={async () =>
            await login({ variables: { usernameOrEmail: username, password } })
          }>
          {loginLoading ? <CircularProgress /> : 'Login'}
        </Button>
      </FormControl>
    </Paper>
  );
};

export default Login;
