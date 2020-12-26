import * as express from 'express';
import * as socketIO from 'socket.io';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import registerClientMessages from './clientMessages';

dotenv.config();

const app = express();
app.use(express.static('public'));

const server = createServer(app);
const io = socketIO(server);

io.on('connection', registerClientMessages);

server.listen(process.env.PORT || 8080);
