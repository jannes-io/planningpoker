import * as R from 'ramda';
import { IServerRoom } from './types';
import { IClientRoom, IRevealedCard } from './typesClient';

export const transformRoom = (room: IServerRoom): IClientRoom => ({
  ...room,
  users: room.users.map((user) => R.omit(['socket', 'selectedCard'])(user)),
});

const sendRoomUpdate = (room: IServerRoom) => {
  room.users.forEach(({ socket }) => {
    socket.emit('updateRoom', transformRoom(room));
  });
};

const sendRevealedCards = (room: IServerRoom) => {
  const revealedCards: IRevealedCard[] = room.users
    .filter(R.propEq('type', 'player'))
    .map(({ id, selectedCard }) => ({ userId: id, selectedCard }));

  room.users.forEach(({ socket }) => {
    socket.emit('revealCards', revealedCards);
  });
};

export default {
  sendRoomUpdate,
  sendRevealedCards,
};
