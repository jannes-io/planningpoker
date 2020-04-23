import { Socket } from 'socket.io';
import * as util from 'util';
import * as R from 'ramda';
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
    logger.log(util.inspect(appState, false, 4, true));
  }
};

const attemptReconnect = (clientId: string, socket: Socket) => {
  appState.rooms.forEach((room) => {
    const user = room.users.find(R.propEq('clientId', clientId));
    if (user !== undefined) {
      user.id = socket.id;
      user.socket = socket;
      user.connected = true;
      emitter.sendRoomUpdate(room);
    }
  });
};

const registerClientMessages = (socket: Socket) => {
  const { _query: { clientId } } = socket.request;
  logger.log(`client ${clientId} connected`);

  clientMessages.forEach(({ msg, handler }) => {
    socket.on(msg, messageWrapper(handler, socket));
  });

  attemptReconnect(clientId, socket);

  socket.on('disconnect', () => {
    emitter.sendUserDisconnected(socket);
    logger.log(`client ${clientId} disconnected`);
  });
};

export default registerClientMessages;
