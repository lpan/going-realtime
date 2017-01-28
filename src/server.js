const path = require('path');
const fs = require('fs');
const koa = require('koa');
const serve = require('koa-static');
const http = require('http');
const SocketIO = require('socket.io');
const app = koa();

const PORT = 3000;

const PUBLIC_PATH = path.join(__dirname, '..', 'public');

app.use(serve(PUBLIC_PATH));

const server = http.Server(app.callback());
const io = SocketIO(server);

io.on('connection', (socket) => {
  console.log('A user connected!!!');
  socket.on('message:new', (payload) => {
    console.log(payload);
  })
});

server.listen(PORT);

console.log(`Server listening on port ${PORT}`);
