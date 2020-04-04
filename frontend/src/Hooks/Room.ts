import { useEffect, useState } from 'react';
import { IRoom } from '../../../backend/src/types';
import { socket } from '../App';

const useRoom = (roomId: string, displayName?: string) => {
  const [room, setRoom] = useState<IRoom | null>(null);

  useEffect(() => {
    if (displayName === undefined) {
      return;
    }
    socket.emit('joinRoom', { room: roomId, displayName }, setRoom);
  }, [roomId, displayName]);

  return room;
};

export default useRoom;
