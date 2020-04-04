import React, { useState } from 'react';
import { Button, createStyles, Grid, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { ArrowForward as JoinIcon, AddBox as CreateIcon } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: theme.spacing(5),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  or: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  roomField: {
    marginBottom: theme.spacing(1),
  },
}));

const RoomSelector: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleJoinRoom = () => {
    if (roomId === '') {
      enqueueSnackbar('Please provide a valid room number', { variant: 'error' });
    } else {
      setRedirect(true);
    }
  };

  const handleCreateRoom = () => {
  };

  if (redirect) {
    return <Redirect to={`/${roomId}`} />;
  }

  return <Grid container className={classes.container}>
    <Grid item xs={12} md={5} className={classes.grid}>
      <Typography variant="h5" className={classes.title}>
        Join an existing room
      </Typography>
      <TextField
        fullWidth
        className={classes.roomField}
        variant="outlined"
        label="Room #"
        value={roomId || ''}
        onChange={({ target }) => setRoomId(target.value)}
      />
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={handleJoinRoom}
        endIcon={<JoinIcon />}
      >
        Join
      </Button>
    </Grid>
    <Grid item xs={12} md={2} className={classes.or}>- or -</Grid>
    <Grid item xs={12} md={5} className={classes.grid}>
      <Typography variant="h5" className={classes.title}>
        Create a new room
      </Typography>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        onClick={handleCreateRoom}
        endIcon={<CreateIcon />}
      >
        Create
      </Button>
    </Grid>
  </Grid>;
};

export default RoomSelector;
