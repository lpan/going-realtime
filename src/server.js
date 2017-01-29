const path = require('path');
const fs = require('fs');

const koa = require('koa');
const serve = require('koa-static');
const http = require('http');
const SocketIO = require('socket.io');

const { MongoClient } = require('mongodb')
const Rx = require('rxjs/Rx');

// db
const { addMessage, getMessages } = require('./db');

// broadcasters
const { broadcastMessages } = require('./broadcast');

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
  MongoClient.connect(DB_URL, (err, db) => {
    getMessages(DEFAULT_LIMIT, db, broadcastMessages(socket))
      .then((db) => { db.close(); });
  });

  socket.on('message:new', (payload) => {
    MongoClient.connect(DB_URL, (err, db) => {
      addMessage(payload, db)
        .then(getMessages(DEFAULT_LIMIT, db, broadcastMessages(io)))
        .then((db) => { db.close(); })
        .catch((e) => { console.error(e.message) });
    });
  });
});

server.listen(PORT);

console.log(`Server listening on port ${PORT}`);
