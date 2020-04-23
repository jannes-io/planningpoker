import { Socket } from 'socket.io';
import roomHandlers from './Handler/roomHandler';
import logger from './logger';
import appState from './state';
import emitter from './emitter';
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
  if (process.env.ENV === 'dev') {
    logger.log(appState);
  }
};

const registerClientMessages = (socket: Socket) => {
  clientMessages.forEach(({ msg, handler }) => {
    socket.on(msg, messageWrapper(handler, socket));
  });

  socket.on('reconnect', () => {
    emitter.sendUserReconnected(socket);
    logger.log('user reconnected');
  });

  socket.on('disconnect', () => {
    emitter.sendUserDisconnected(socket);
    logger.log('user disconnected');
  });
};

export default registerClientMessages;
