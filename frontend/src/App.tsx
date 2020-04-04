import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const App: React.FC = () => {
  useEffect(() => {
    const socket = socketIOClient('http://localhost:8080');
    socket.emit('createRoom', (roomId: string) => {
      socket.emit('joinRoom', { room: roomId, displayName: 'test' }, console.log);
    });
  }, []);

  return <div>Check yo console</div>;
};

export default App;
