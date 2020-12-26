import * as R from 'ramda';
import { Socket } from 'socket.io';
import { findGameInfo, findRoom } from '../state';
import { IClearCardData, IPlayCardData } from '../typesClient';
import emitter from '../emitter';
import logger from '../logger';

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

  const connectedPlayers = room.users
    .filter(R.prop('connected'))
    .filter(R.propEq('type', 'player'));

  const playersWithCards = connectedPlayers
    .filter(R.prop('hasCardSelected'));

  if (connectedPlayers.length === playersWithCards.length) {
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
