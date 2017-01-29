const getDefaultName = (id) => `User-${id}`

const normalizeConn = (db) => ({ db });

const addMessage = (message) => ({ db }) => new Promise((resolve, reject) => {
  const collection = db.collection('messages');
  collection.insertOne(message, (e, result) => {
    if (e) {
      reject(e);
    }

    resolve({ db });
  });
});

// factored out of appendUsernames for readability
// Add "field" to each of the messages
const addUsernames = ({ db, names, messages }) => {
  const newMessages = messages.map((message, i) => {
    return Object.assign({}, message, { name: names[i] });
  });

  return Promise.resolve({ db, messages: newMessages });
};

// add "name" field to a list of messages
const appendUsernames = ({ db, messages }) =>
  Promise.all(messages.map(({ id }) => getUser(id)({ db })))
    .then((payload) => addUsernames({ db, messages, names: payload.map((p) => p.user.name) }));

const getMessages = (limit) => ({ db }) => new Promise((resolve, reject) => {
  db.collection('messages')
    .find()
    .sort({ _id: -1 })
    .limit(limit)
    .toArray((e, messages) => {
      if (e) {
        reject(e);
      }

      resolve({ db, messages });
    });
}).then(appendUsernames);

const getUser = (id) => ({ db }) => new Promise((resolve, reject) => {
  const users = db.collection('users');
  users.findOne({ id }).then((user) => {
    // if new user, we create an entry in db
    if (!user) {
      const newUser = { id, name: getDefaultName(id) };
      users.insertOne(newUser, (e) => {
        if (e) {
          reject(e);
        }

        resolve({ db, newUser });
      });
    } else {
      resolve({ db, user });
    }
  });
});

const updateUser = (newUser) => ({ db }) => new Promise((resolve, reject) => {
  const { id } = newUser;
  const users = db.collection('users');
  users.updateOne({ id }, newUser)
    .then(() => { resolve({ db, user: newUser }); })
    .catch(reject);
});

const closeDB = ({ db }) => { db.close() };

const handleError = (e) => { console.error(e); };

module.exports = {
  normalizeConn,
  addMessage,
  getMessages,
  getUser,
  updateUser,
  closeDB,
  handleError,
};
