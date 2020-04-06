import socketIOClient from 'socket.io-client';

const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL || '');

const useSocket = () => socket;

export default useSocket;
