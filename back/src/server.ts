import * as dotenv from 'dotenv'
dotenv.config()
import Express, { json } from 'express'
import http from 'http';
import socket from 'socket.io'
import router from '../src/router'
import cors from 'cors'

const corsOptions = {
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'Cookie',
    'Set-Cookie',
    'Token'
  ],
  credentials: true,
  methods: ['GET', 'POST']
};

const app = Express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(json())
app.use(cors(corsOptions));
app.use('/api', router)


io.on('connection', (socket: any) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg: string) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

io.on('connection', (socket: any) => {
  socket.broadcast.emit('hi');
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`listening on http://localhost:${process.env.PORT || 3000}`);
});
