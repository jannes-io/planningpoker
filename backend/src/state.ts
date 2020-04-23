// FIXME this is really disgusting state management
import * as R from 'ramda';
import { Socket } from 'socket.io';
import { IAppState, IServerRoom, IServerUser } from './types';

const appState: IAppState = {
  rooms: [],
};

export const findRoom = (roomId: string): IServerRoom | undefined => appState.rooms
  .find(R.propEq('id', roomId));

export const findUser = (room: IServerRoom, socket: Socket): IServerUser | undefined => room.users
  .find((user) => user.socket.id === socket.id);

export interface IGameInfo {
  user: IServerUser;
  room: IServerRoom;
}

export const findGameInfo = (roomId: string, socket: Socket): IGameInfo | undefined => {
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

export const findGameInfoBySocket = (socket: Socket): IGameInfo | undefined => {
  const userRoom = appState.rooms.find((room) => findUser(room, socket) !== undefined);
  return userRoom !== undefined ? findGameInfo(userRoom.id, socket) : undefined;
};

export default appState;
