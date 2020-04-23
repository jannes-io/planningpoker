import React from 'react';
import { createStyles, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import {
  Done as HasCardIcon,
  HowToReg as PlayerIcon,
  MoreHoriz as HasNoCardIcon,
  Person as SpectatorIcon,
  SignalWifiOff as Disconnected,
} from '@material-ui/icons';
import { IUser } from '../types';

const useStyles = makeStyles(() => createStyles({
  disconnectedText: {
    textDecoration: 'line-through',
  },
}));

const UserList: React.FC<{ users: IUser[] }> = ({ users }) => {
  const classes = useStyles();

  const getPlayerIcon = (user: IUser) => {
    if (!user.connected) {
      return <Disconnected />;
    }
    return user.type === 'player' ? <PlayerIcon /> : <SpectatorIcon />;
  };

  return <List>
    {users.map((user) => <ListItem key={user.id}>
      <ListItemIcon>
        {getPlayerIcon(user)}
      </ListItemIcon>
      <ListItemText className={user.connected ? undefined : classes.disconnectedText}>
        {user.displayName}
      </ListItemText>
      {user.type === 'player' && user.connected
        ? <ListItemIcon>
          {user.hasCardSelected ? <HasCardIcon /> : <HasNoCardIcon />}
        </ListItemIcon>
        : null}
    </ListItem>)}
  </List>;
};

export default UserList;
