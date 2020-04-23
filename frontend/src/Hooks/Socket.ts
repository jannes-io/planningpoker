import socketIOClient from 'socket.io-client';
import * as uniqid from 'uniqid';
import { useState } from 'react';

const clientId = uniqid.time();
const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL || '', {
  query: `clientId=${clientId}`,
});

const useSocket = () => {
  const [connected, setConnected] = useState(true);
  socket.on('disconnect', () => setConnected(false));
  socket.on('reconnect', () => setConnected(true));

  return { socket, clientId, connected };
};

export default useSocket;
