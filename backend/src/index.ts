import * as express from 'express';
import * as socketIO from 'socket.io';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { Socket } from 'socket.io';
import logger from './logger';
import registerClientMessages from './clientMessages';

dotenv.config();

const app = express();

const server = createServer(app);
const io = socketIO(server);

io.on('connection', (socket: Socket) => {
  logger.log('user connected');

  registerClientMessages(socket);
});

server.listen(process.env.PORT || 8080);
