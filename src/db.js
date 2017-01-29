const getDefaultName = (id) => `User-${id}`

const addMessage = (message) => (db) => new Promise((resolve, reject) => {
  const collection = db.collection('messages');
  collection.insertOne(message, (e, result) => {
    if (e) {
      reject(e);
    }

    resolve(db);
  });
});

const getMessages = (limit, cb) => (db) => new Promise((resolve, reject) => {
  db.collection('messages')
    .find()
    .sort({ _id: -1 })
    .limit(limit)
    .toArray((e, docs) => {
      if (e) {
        reject(e);
      }

      cb(docs);
      resolve(db);
    });
});

const getUser = (id, cb) => (db) => new Promise((resolve, reject) => {
  const users = db.collection('users');
  users.findOne({ id }).then((user) => {
    // if new user, we create an entry in db
    if (!user) {
      const newUser = { id, name: getDefaultName(id) };
      users.insertOne(newUser, (e) => {
        if (e) {
          reject(e);
        }

        cb(newUser);
        resolve(db);
      });
    } else {
      cb(user);
      resolve(db);
    }
  });
});

const updateUser = (newUser, cb) => (db) => new Promise((resolve, reject) => {
  const { id } = newUser;
  const users = db.collection('users');
  users.updateOne({ id }, newUser)
    .then(() => {
      cb(newUser);
      resolve(db);
    })
    .catch(reject);
});

const closeDB = (db) => { db.close() };

const handleError = (e) => { console.error(e.message); };

module.exports = {
  addMessage,
  getMessages,
  getUser,
  updateUser,
  closeDB,
  handleError,
};
