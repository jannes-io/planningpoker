import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  Done as HasCardIcon,
  HowToReg as PlayerIcon,
  MoreHoriz as HasNoCardIcon,
  Person as SpectatorIcon,
} from '@material-ui/icons';
import { IUser } from '../../../backend/src/typesClient';

const UserList: React.FC<{ users: IUser[] }> = ({ users }) => <List>
  {users.map((user) => <ListItem key={user.id}>
    <ListItemIcon>
      {user.type === 'player' ? <PlayerIcon /> : <SpectatorIcon />}
    </ListItemIcon>
    <ListItemText>
      {user.displayName}
    </ListItemText>
    {user.type === 'player'
      ? <ListItemIcon>
        {user.hasCardSelected ? <HasCardIcon /> : <HasNoCardIcon />}
      </ListItemIcon>
      : null}
  </ListItem>)}
</List>;

export default UserList;
