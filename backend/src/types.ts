import { Socket } from 'socket.io';
import { IRoom, IUser } from './typesClient';

export interface IServerUser extends IUser {
  socket: Socket;
  clientId: string;
  selectedCard?: string;
}

export interface IServerRoom extends IRoom {
  users: IServerUser[];
}

export interface IAppState {
  rooms: IServerRoom[];
}
