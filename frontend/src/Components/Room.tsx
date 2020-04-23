import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {
  FileCopy as CopyIcon,
  Clear as ClearIcon,
} from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { IClientRoom, IPlayCardData, IRevealedCard } from '../types';
import useSocket from '../Hooks/Socket';
import Card from './Card';
import UserList from './UserList';

const useStyles = makeStyles((theme: Theme) => createStyles({
  buttonWrapper: {
    '& button': {
      marginRight: theme.spacing(1),
    },
  },
}));

interface IRoomProps {
  initialRoom: IClientRoom;
  displayName: string;
}

const Room: React.FC<IRoomProps> = ({ initialRoom, displayName }) => {
  const [room, setRoom] = useState<IClientRoom>(initialRoom);
  const [visibleCards, setVisibleCards] = useState<IRevealedCard[]>();
  const { enqueueSnackbar } = useSnackbar();
  const { socket } = useSocket();
  const classes = useStyles();

  const self = room.users.find(R.propEq('displayName', displayName))!;

  useEffect(() => {
    socket.on('updateRoom', setRoom);
    socket.on('revealCards', setVisibleCards);
    socket.on('clearAllCards', () => setVisibleCards(undefined));
  }, [socket]);

  const handlePlayCard = (card: string) => {
    if (visibleCards === undefined) {
      const data: IPlayCardData = { roomId: room.id, card };
      socket.emit('playCard', data);
    }
  };

  const url = window.location.href;
  const copyUrlToClipboard = () => {
    const elem = document.createElement('textarea');
    elem.value = url;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    enqueueSnackbar('Invite link copied to clipboard!', { variant: 'success' });
  };

  return <Grid container spacing={2}>
    <Grid item xs={12} className={classes.buttonWrapper}>
      <Button
        variant="outlined"
        startIcon={<CopyIcon />}
        onClick={copyUrlToClipboard}
      >
        Copy invite link
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<ClearIcon />}
        onClick={() => socket.emit('clearAllCards', { roomId: room.id })}
      >
        Reset all cards
      </Button>
    </Grid>
    <Grid item xs={12} md={5}>
      <UserList users={room.users} />
    </Grid>
    <Grid item xs={12} md={7}>
      <Grid container spacing={1}>
        {visibleCards === undefined
          ? room.users
            .filter(R.prop('hasCardSelected'))
            .map(({ id }) => <Card key={id} wide card="X" />)
          : visibleCards
            .map(({ userId, selectedCard }) => <Card
              key={userId}
              wide
              label={room.users.find(R.propEq('id', userId))?.displayName}
              card={selectedCard}
            />)}
      </Grid>
    </Grid>
    {self.type === 'player'
      ? <Grid item xs={12}>
        <Grid container spacing={1}>
          {room.cards.map((card) => <Card
            key={card}
            card={card}
            onSelectCard={handlePlayCard}
          />)}
        </Grid>
      </Grid>
      : null}
  </Grid>;
};

export default Room;
