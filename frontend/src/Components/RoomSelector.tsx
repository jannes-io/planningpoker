import React, { useState } from 'react';
import {
  Button,
  createStyles,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { ArrowForward as JoinIcon, AddBox as CreateIcon, Info as InfoIcon } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { Redirect } from 'react-router';
import defaultDecks, { DeckName } from '../decks';
import { ICreateRoomData } from '../../../backend/src/typesClient';
import useSocket from '../Hooks/Socket';

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
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
}));

const RoomSelector: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [deck, setDeck] = useState<DeckName>('Scrum');
  const [customDeck, setCustomDeck] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const socket = useSocket();
  const classes = useStyles();

  const handleJoinRoom = () => {
    if (roomId === '') {
      enqueueSnackbar('Please provide a valid room number', { variant: 'error' });
    } else {
      setRedirect(true);
    }
  };

  const handleCreateRoom = () => {
    const cards = deck === 'Custom'
      ? customDeck.split(',')
      : defaultDecks.find(({ name }) => name === deck)?.options;

    if (cards !== undefined) {
      const createData: ICreateRoomData = { cards };
      socket.emit('createRoom', createData, (createdRoomId: string) => {
        setRoomId(createdRoomId);
        setRedirect(true);
      });
    }
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
        className={classes.marginBottom}
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
      <FormControl>
        <FormLabel>Deck type</FormLabel>
        <RadioGroup value={deck} onChange={({ target }) => setDeck(target.value as DeckName)}>
          {defaultDecks.map(({ name }) => <FormControlLabel
            key={name}
            value={name}
            control={<Radio />}
            label={name}
          />)}
          <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
        </RadioGroup>
      </FormControl>
      <Fade in={deck === 'Custom'}>
        <TextField
          fullWidth
          className={classes.marginBottom}
          variant="outlined"
          label="Deck"
          value={customDeck}
          onChange={({ target }) => setCustomDeck(target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <Tooltip title="Comma separated list of options. Ex: 1,2,3,hello,world">
                <InfoIcon />
              </Tooltip>
            </InputAdornment>,
          }}
        />
      </Fade>
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
