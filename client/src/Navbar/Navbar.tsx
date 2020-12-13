import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MobileMenu, AuthMenu } from '.';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AppContext } from 'Context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    desktopMenu: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    }
  })
);

const Navbar: React.FC = () => {
  const { user } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position='static' color='secondary'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Pic-o-gram
          </Typography>

          <div className={classes.desktopMenu}>
            {user ? (
              <AuthMenu />
            ) : (
              <ButtonGroup variant='contained' color='primary'>
                <Button
                  onClick={() => history.push('/login')}
                  startIcon={<AccountCircleIcon />}
                >
                  Login
                </Button>
                <Button
                  onClick={() => history.push('/register')}
                  startIcon={<CreateIcon />}
                >
                  Register
                </Button>
              </ButtonGroup>
            )}
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={() => setShowMenu(!showMenu)}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <MobileMenu openMenu={showMenu} handleClick={() => setShowMenu(false)} />
    </div>
  );
};

export default Navbar;
