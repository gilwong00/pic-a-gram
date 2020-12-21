import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER } from 'graphql/user/mutations';
import { ME } from 'graphql/user/queries';
import {
  Paper,
  FormControl,
  TextField,
  InputAdornment,
  Button,
  CircularProgress
} from '@material-ui/core';
import {
  red,
  blue,
  green,
  purple,
  orange,
  yellow,
  teal,
  pink
} from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';

const ALL_COLORS = [red, blue, green, purple, orange, yellow, teal, pink];

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
      minHeight: 180,
      height: 'auto',
      [theme.breakpoints.down('md')]: {
        width: 260
      }
    },
    field: {
      paddingTop: 15,
      paddingBottom: 20
    }
  })
);

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const classes = useStyles();
  const history = useHistory();
  const [
    register,
    { loading: registerLoading, error: registerError }
  ] = useMutation(REGISTER, {
    update(cache, { data }) {
      if (registerError) console.log(registerError);

      cache.writeQuery({
        query: ME,
        data: {
          __typename: 'Query',
          me: data?.register
        }
      });
      history.push('/');
    }
  });

  const randomize = () => Math.floor(Math.random() * ALL_COLORS.length);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmedPassword) return;
    if (password !== confirmedPassword) return;
    await register({
      variables: {
        username,
        email,
        password,
        avatarColor: ALL_COLORS[randomize()][500]
      }
    });
  };

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
            )
          }}
        />
      </FormControl>

      <FormControl fullWidth={true} className={classes.field}>
        <TextField
          placeholder='Email Address'
          value={email}
          type='text'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <EmailIcon />
              </InputAdornment>
            )
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
            )
          }}
        />
      </FormControl>

      <FormControl fullWidth={true} className={classes.field}>
        <TextField
          placeholder='Confirm Password'
          value={confirmedPassword}
          type='password'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmedPassword(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <EnhancedEncryptionIcon />
              </InputAdornment>
            )
          }}
        />
      </FormControl>

      <FormControl fullWidth={true}>
        <Button
          variant='contained'
          color='primary'
          disabled={!username || !password || !email || !confirmedPassword}
          onClick={handleRegister}
        >
          {registerLoading ? <CircularProgress /> : 'Login'}
        </Button>
      </FormControl>
    </Paper>
  );
};

export default Register;
