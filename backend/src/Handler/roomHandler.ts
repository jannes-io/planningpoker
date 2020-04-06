import * as uniqid from 'uniqid';
import * as R from 'ramda';
import { Socket } from 'socket.io';
import appState from '../state';
import logger from '../logger';
import { IServerRoom } from '../types';
import { ICreateRoomData, IJoinRoomData } from '../typesClient';
import emitter, { transformRoom } from '../emitter';

const createRoom = (_: Socket, { cards }: ICreateRoomData, acknowledge: Function) => {
  const room: IServerRoom = {
    id: uniqid(),
    users: [],
    cards,
  };

  appState.rooms.push(room);
  acknowledge(room.id);

  logger.log(`Created room ${room.id}.`);
};

const joinRoom = (socket: Socket, data: IJoinRoomData, acknowledge: Function) => {
  const { roomId, displayName, playerType } = data;
  const room = appState.rooms.find(R.propEq('id', roomId));

  if (room === undefined) {
    logger.warn(`${displayName} failed to join room ${roomId}. Room does not exist`);
    return;
  }

  room.users.push({
    id: socket.id,
    socket,
    displayName,
    type: playerType,
    hasCardSelected: false,
  });

  emitter.sendRoomUpdate(room);

  acknowledge(transformRoom(room));
  logger.log(`${displayName} joined room ${roomId} as ${playerType}`);
};

export default {
  createRoom,
  joinRoom,
};
