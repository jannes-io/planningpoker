import { useEffect, useState } from 'react';
import { IClientRoom } from '../../../backend/src/typesClient';
import { socket } from '../App';

const useRoom = (initialRoomData: IClientRoom) => {
  const [room, setRoom] = useState<IClientRoom>(initialRoomData);

  const handleRoomUpdate = (newRoom: IClientRoom) => {
    setRoom(newRoom);
  };

  useEffect(() => {
    socket.on('updateRoom', handleRoomUpdate);
  }, []);

  return room;
};

export default useRoom;
