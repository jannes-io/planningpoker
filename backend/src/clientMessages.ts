import { Socket } from 'socket.io';
import * as R from 'ramda';
import roomHandlers from './Handler/roomHandler';
import logger from './logger';
import appState from './state';
import emitter from './emitter';
import { IServerUser } from './types';
import gameHandlers from './Handler/gameHandler';

interface IClientMessage {
  msg: string;
  handler: (...args: any[]) => void;
}

const clientMessages: IClientMessage[] = [{
  msg: 'createRoom',
  handler: roomHandlers.createRoom,
}, {
  msg: 'joinRoom',
  handler: roomHandlers.joinRoom,
}, {
  msg: 'playCard',
  handler: gameHandlers.playCard,
}, {
  msg: 'clearCard',
  handler: gameHandlers.clearCard,
}, {
  msg: 'clearAllCards',
  handler: gameHandlers.clearAllCards,
}];

const messageWrapper = (handler: Function, socket: Socket) => (...args: any[]) => {
  handler(socket, ...args);
  logger.log(appState);
};

const registerClientMessages = (socket: Socket) => {
  clientMessages.forEach(({ msg, handler }) => {
    socket.on(msg, messageWrapper(handler, socket));
  });

  socket.on('disconnect', () => {
    const findBySocket = (user: IServerUser) => user.socket.id === socket.id;
    const userRoom = appState.rooms.find(({ users }) => users.find(findBySocket));
    if (userRoom !== undefined) {
      userRoom.users = R.reject(findBySocket, userRoom.users);
      if (userRoom.users.length > 0) {
        emitter.sendRoomUpdate(userRoom);
      } else {
        appState.rooms = appState.rooms.filter((room) => room.id !== userRoom.id);
      }
    }

    logger.log('user disconnected');
  });
};

export default registerClientMessages;
