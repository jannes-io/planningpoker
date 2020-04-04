import * as uniqid from 'uniqid';
import * as R from 'ramda';
import appState from '../state';
import { IRoom } from '../types';

const createRoom = (acknowledge: Function) => {
  const room: IRoom = {
    id: uniqid(),
    users: [],
  };

  appState.rooms.push(room);
  acknowledge(room.id);
};

interface IJoinRoomData {
  room: string;
  displayName: string;
}

const joinRoom = ({ room: roomId, displayName }: IJoinRoomData, acknowledge: Function) => {
  const room = appState.rooms.find(R.propEq('id', roomId));
  if (room !== undefined) {
    room.users.push({
      displayName,
    });
    acknowledge(room);
  }
};

export default {
  createRoom,
  joinRoom,
};
