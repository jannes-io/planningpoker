import { Socket } from 'socket.io';
import roomHandlers from './Handler/roomHandler';

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
}];

const registerClientMessages = (socket: Socket) => {
  clientMessages.forEach(({ msg, handler }) => {
    socket.on(msg, handler);
  });
};

export default registerClientMessages;
