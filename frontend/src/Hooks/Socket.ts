import socketIOClient from 'socket.io-client';
import * as uniqid from 'uniqid';

const clientId = uniqid.time();
const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL || '', {
  query: `clientId=${clientId}`,
});
/* eslint-disable no-console */
socket.on('disconnect', () => console.log('disconnected!'));
socket.on('reconnect', () => console.log('reconnected!'));
socket.on('reconnecting', () => console.log('reconnecting...'));
socket.on('reconnect_failed', () => console.log('reconnecting failed'));

const useSocket = () => ({ socket, clientId });

export default useSocket;
