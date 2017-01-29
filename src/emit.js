const emitMessages = (socket) => ({ db, messages }) => {
  socket.emit('messages:return', messages);
  return Promise.resolve({ db });
};

const emitUserInfo = (socket) => ({ db, user }) => {
  socket.emit('user:return', user);
  return Promise.resolve({ db });
}

module.exports = {
  emitMessages,
  emitUserInfo,
};
