import React from 'react';
import * as R from 'ramda';
import {
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import {
  HowToReg as PlayerIcon,
  Person as SpectatorIcon,
  Done as HasCardIcon,
  MoreHoriz as HasNoCardIcon,
} from '@material-ui/icons';
import { IClientRoom } from '../../../backend/src/typesClient';
import useRoom from '../Hooks/Room';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: theme.spacing(25),
    cursor: 'pointer',
    '&:hover': {
      background: '#f1f1f1',
      WebkitBoxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      MozBoxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
  },
}));

interface IRoomProps {
  initialRoom: IClientRoom;
  displayName: string;
}

const Room: React.FC<IRoomProps> = ({ initialRoom, displayName }) => {
  const room = useRoom(initialRoom);
  const classes = useStyles();
  const self = room.users.find(R.propEq('displayName', displayName))!;

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <p>
        You are in room
        {` ${room.id}`}
      </p>
    </Grid>
    <Grid item xs={12} md={5}>
      <List>
        {room.users.map((user) => <ListItem key={user.id}>
          <ListItemIcon>
            {user.type === 'player' ? <PlayerIcon /> : <SpectatorIcon />}
          </ListItemIcon>
          <ListItemText>
            {user.displayName}
          </ListItemText>
          {user.type === 'player'
            ? <ListItemIcon>
              {user.selectedCard === undefined ? <HasNoCardIcon /> : <HasCardIcon />}
            </ListItemIcon>
            : null}
        </ListItem>)}
      </List>
    </Grid>
    <Grid item xs={12} md={7}>
      Results:
    </Grid>
    {self.type === 'player'
      ? <Grid item xs={12}>
        <Grid container spacing={1}>
          {room.cards.map((card) => <Grid item xs={6} sm={4} md={2} key={card}>
            <Paper variant="outlined" elevation={3} className={classes.paper}>
              <Typography variant="h4">
                {card}
              </Typography>
            </Paper>
          </Grid>)}
        </Grid>
      </Grid>
      : null}
  </Grid>;
};

export default Room;
