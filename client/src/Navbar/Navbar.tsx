import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from 'Context';
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
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        '& h6': {
          display: 'none'
        }
      }
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
    },
    homeIcon: {
      paddingRight: 15
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
          <Link to='/' className={classes.title}>
            <CameraEnhanceIcon className={classes.homeIcon} fontSize='large' />
            <Typography variant='h6' className={classes.title}>
              Pic-o-gram
            </Typography>
          </Link>

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
