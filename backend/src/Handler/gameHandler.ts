import * as R from 'ramda';
import { Socket } from 'socket.io';
import appState from '../state';
import { IClearCardData, IPlayCardData } from '../typesClient';
import { IServerRoom } from '../types';
import emitter from '../emitter';
import logger from '../logger';

const findRoom = (roomId: string) => appState.rooms.find(R.propEq('id', roomId));
const findUser = (room: IServerRoom, socket: Socket) => room.users
  .find((user) => user.socket.id === socket.id);

const findGameInfo = (roomId: string, socket: Socket) => {
  const room = findRoom(roomId);
  if (room === undefined) {
    return undefined;
  }
  const user = findUser(room, socket);
  if (user === undefined) {
    return undefined;
  }

  return { room, user };
};

const playCard = (socket: Socket, data: IPlayCardData) => {
  const gameInfo = findGameInfo(data.roomId, socket);
  if (gameInfo === undefined) {
    logger.warn(`Unable to play card in room ${data.roomId}`);
    return;
  }
  const { user, room } = gameInfo;

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
  const gameInfo = findGameInfo(data.roomId, socket);
  if (gameInfo === undefined) {
    logger.warn(`Unable to clear card in room ${data.roomId}`);
    return;
  }
  const { user, room } = gameInfo;

  user.selectedCard = undefined;
  user.hasCardSelected = false;
  emitter.sendRoomUpdate(room);
};

const clearAllCards = (_: Socket, data: IClearCardData) => {
  const room = findRoom(data.roomId);
  if (room === undefined) {
    logger.warn(`Unable to clear all cards in room ${data.roomId}`);
    return;
  }

  room.users = room.users.map((user) => ({
    ...user,
    selectedCard: undefined,
    hasCardSelected: false,
  }));

  emitter.sendRoomUpdate(room);
  emitter.sendClearAllCards(room);
};

export default {
  playCard,
  clearCard,
  clearAllCards,
};
