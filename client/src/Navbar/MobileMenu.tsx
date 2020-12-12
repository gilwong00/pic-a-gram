import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  openMenu: boolean;
  handleClick: () => void;
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const MobileMenu: React.FC<IProps> = ({ openMenu, handleClick }) => {
  const classes = useStyles();

  return (
    <Drawer anchor='right' open={openMenu} onClose={handleClick}>
      <div className={classes.list} role='presentation' onClick={handleClick}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={'Login'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary={'Register'} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default MobileMenu;
