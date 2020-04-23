import * as R from 'ramda';
import { Socket } from 'socket.io';
import { IServerRoom } from './types';
import { IClientRoom, IRevealedCard } from './typesClient';
import appState, { findGameInfoBySocket } from './state';

export const transformRoom = (room: IServerRoom): IClientRoom => ({
  ...room,
  users: room.users.map((user) => R.omit(['socket', 'selectedCard'])(user)),
});

const sendRoomUpdate = (room: IServerRoom) => {
  room.users.forEach(({ socket }) => {
    socket.emit('updateRoom', transformRoom(room));
  });
};

const sendUserReconnected = (socket: Socket) => {
  const gameInfo = findGameInfoBySocket(socket);
  if (gameInfo !== undefined) {
    gameInfo.user.connected = true;
    sendRoomUpdate(gameInfo.room);
  }
};

const sendUserDisconnected = (socket: Socket) => {
  const gameInfo = findGameInfoBySocket(socket);
  if (gameInfo !== undefined) {
    gameInfo.user.connected = false;

    const connectedUsers = gameInfo.room.users.filter(R.prop('connected'));
    if (connectedUsers.length === 0) {
      appState.rooms = appState.rooms.filter((room) => room.id !== gameInfo.room.id);
    } else {
      sendRoomUpdate(gameInfo.room);
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
  sendUserReconnected,
  sendUserDisconnected,
};
