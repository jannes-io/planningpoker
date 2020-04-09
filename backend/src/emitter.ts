import * as R from 'ramda';
import { Socket } from 'socket.io';
import { IServerRoom, IServerUser } from './types';
import { IClientRoom, IRevealedCard } from './typesClient';
import appState from './state';

export const transformRoom = (room: IServerRoom): IClientRoom => ({
  ...room,
  users: room.users.map((user) => R.omit(['socket', 'selectedCard'])(user)),
});

const sendRoomUpdate = (room: IServerRoom) => {
  room.users.forEach(({ socket }) => {
    socket.emit('updateRoom', transformRoom(room));
  });
};

const sendUserDisconnected = (socket: Socket) => {
  const findBySocket = (user: IServerUser) => user.socket.id === socket.id;
  const userRoom = appState.rooms.find(({ users }) => users.find(findBySocket));

  if (userRoom !== undefined) {
    userRoom.users = R.reject(findBySocket, userRoom.users);
    if (userRoom.users.length > 0) {
      sendRoomUpdate(userRoom);
    } else if (process.env.ENV !== 'dev') {
      appState.rooms = appState.rooms.filter((room) => room.id !== userRoom.id);
    }
  }
};

const sendRevealedCards = (room: IServerRoom) => {
  const revealedCards: IRevealedCard[] = room.users
    .filter(R.propEq('type', 'player'))
    .map(({ id, selectedCard }) => ({ userId: id, selectedCard }));

  room.users.forEach(({ socket }) => {
    socket.emit('revealCards', revealedCards);
  });
};

const sendClearAllCards = (room: IServerRoom) => {
  room.users.forEach(({ socket }) => {
    socket.emit('clearAllCards');
  });
};

export default {
  sendRoomUpdate,
  sendRevealedCards,
  sendClearAllCards,
  sendUserDisconnected,
};
