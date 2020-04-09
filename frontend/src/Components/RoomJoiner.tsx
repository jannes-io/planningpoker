import React, { useState } from 'react';
import {
  Button,
  createStyles,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { IClientRoom, IJoinRoomData, PlayerType } from '../types';
import Room from './Room';
import useSocket from '../Hooks/Socket';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: theme.spacing(5),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  switchContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

type Mode = 'player' | 'spectator';

const RoomJoiner = () => {
  const [displayName, setDisplayName] = useState<string>('');
  const [playerType, setPlayerType] = useState<PlayerType>('player');
  const [initialRoomData, setInitialRoomData] = useState<IClientRoom>();
  const { enqueueSnackbar } = useSnackbar();
  const { id: roomId } = useParams<{ id: string }>();
  const socket = useSocket();
  const classes = useStyles();

  const handleJoinRoom = () => {
    if (displayName === '') {
      enqueueSnackbar('Your display name can not be empty!', { variant: 'error' });
    } else {
      const joinData: IJoinRoomData = {
        roomId,
        displayName,
        playerType,
      };
      socket.emit('joinRoom', joinData, setInitialRoomData);
    }
  };

  if (initialRoomData !== undefined) {
    return <Room displayName={displayName} initialRoom={initialRoomData} />;
  }

  return <Grid container className={classes.container} spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h5">{`Joining room ${roomId}`}</Typography>
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        variant="outlined"
        label="Display name"
        value={displayName}
        onChange={({ target }) => setDisplayName(target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <RadioGroup
        value={playerType}
        onChange={({ target }) => setPlayerType(target.value as Mode)}
        className={classes.switchContainer}
      >
        <FormControlLabel value="player" control={<Radio />} label="Player" />
        <FormControlLabel value="spectator" control={<Radio />} label="Spectator" />
      </RadioGroup>
    </Grid>
    <Grid item xs={12}>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={handleJoinRoom}
      >
        let me in!
      </Button>
    </Grid>
  </Grid>;
};

export default RoomJoiner;
