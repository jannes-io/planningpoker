import * as R from 'ramda';
import { Socket } from 'socket.io';
import appState from '../state';
import { IClearCardData, IPlayCardData } from '../typesClient';
import { IServerRoom } from '../types';
import emitter from '../emitter';

const findRoom = (roomId: string) => appState.rooms.find(R.propEq('id', roomId));
const findUser = (room: IServerRoom, socket: Socket) => room.users
  .find((user) => user.socket.id === socket.id);

const playCard = (socket: Socket, data: IPlayCardData) => {
  const room = findRoom(data.roomId);
  const user = findUser(room, socket);

  user.selectedCard = data.card;
  user.hasCardSelected = true;
  emitter.sendRoomUpdate(room);

  const playerCount = room.users.filter(R.propEq('type', 'player')).length;
  const selectedCardCount = room.users.filter(R.prop('hasCardSelected')).length;
  if (playerCount === selectedCardCount) {
    emitter.sendRevealedCards(room);
  }
};

const clearCard = (socket: Socket, data: IClearCardData) => {
  const room = findRoom(data.roomId);
  const user = findUser(room, socket);

  user.selectedCard = undefined;
  user.hasCardSelected = false;
  emitter.sendRoomUpdate(room);
};

const clearAllCards = (_: Socket, data: IClearCardData) => {
  const room = findRoom(data.roomId);

  room.users = room.users.map((user) => ({
    ...user,
    selectedCard: undefined,
    hasCardSelected: false,
  }));

  emitter.sendRoomUpdate(room);
};

export default {
  playCard,
  clearCard,
  clearAllCards,
};
