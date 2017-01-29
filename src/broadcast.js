const broadcastMessages = (io) => (messages) => {
  io.emit('messages:update', messages);
};

module.exports = {
  broadcastMessages,
};
