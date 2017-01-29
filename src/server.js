const path = require('path');
const fs = require('fs');
const Rx = require('rxjs/Rx');

const koa = require('koa');
const serve = require('koa-static');
const http = require('http');
const SocketIO = require('socket.io');
const { MongoClient } = require('mongodb')

const { addMessage, getMessages, getUser, closeDB, handleError } = require('./db');
const { emitMessages, emitUserInfo } = require('./emit');

const app = koa();

// Constants
const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017/going-realtime';
const DEFAULT_LIMIT = 50;
const PUBLIC_PATH = path.join(__dirname, '..', 'public');

app.use(serve(PUBLIC_PATH));

const server = http.Server(app.callback());
const io = SocketIO(server);

io.on('connection', (socket) => {
  // fetch latest chat history
  MongoClient.connect(DB_URL)
    .then(getMessages(DEFAULT_LIMIT, emitMessages(socket)))
    .then(closeDB)
    .catch(handleError);

  // get user info from user id then send object back to user
  socket.on('info:get', ({ id }) => {
    MongoClient.connect(DB_URL)
      .then(getUser(id, emitUserInfo(socket)))
      .then(closeDB)
      .catch(handleError);
  });

  // add new messgae to db then broadcast latest messages
  socket.on('message:new', (payload) => {
    MongoClient.connect(DB_URL)
      .then(addMessage(payload))
      .then(getMessages(DEFAULT_LIMIT, emitMessages(io)))
      .then(closeDB)
      .catch(handleError);
  });
});

server.listen(PORT);

console.log(`Server listening on port ${PORT}`);
