import * as express from 'express';
import * as socketIO from 'socket.io';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { Socket } from 'socket.io';
import logger from './logger';
import registerClientMessages from './clientMessages';

dotenv.config();

const app = express();
app.use(express.static('public'));

const server = createServer(app);
const io = socketIO(server);

io.on('connection', (socket: Socket) => {
  logger.log('user connected');

  registerClientMessages(socket);
});

server.listen(process.env.BACKEND_PORT || 8080);
