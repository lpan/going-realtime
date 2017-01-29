const emitMessages = (socket) => (messages) => {
  socket.emit('messages:return', messages);
};

const emitUserInfo = (socket) => (user) => {
  socket.emit('user:return', user);
}

module.exports = {
  emitMessages,
  emitUserInfo,
};
