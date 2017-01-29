const addMessage = (message, db) => {
  const collection = db.collection('messages');
  return collection.insertOne(message);
}

const getMessages = (limit, db, cb) => new Promise((resolve, reject) => {
  db.collection('messages').find().limit(limit).toArray((e, docs) => {
    if (e) {
      reject(e);
    }

    cb(docs);
    resolve(db);
  });
});

module.exports = {
  addMessage,
  getMessages,
};
