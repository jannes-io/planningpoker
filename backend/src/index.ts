import * as socketIO from 'socket.io';

const io = socketIO(80);

io.on('connection', () => {
    console.log('user connected');
});
