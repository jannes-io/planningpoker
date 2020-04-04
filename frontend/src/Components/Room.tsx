import React from 'react';
import { useParams } from 'react-router';
import useRoom from '../Hooks/Room';

const Room: React.FC = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const room = useRoom(roomId);

  return <div>
    You are in room
    {` ${roomId}`}
  </div>;
};

export default Room;
