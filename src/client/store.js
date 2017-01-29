import Cookies from 'js-cookie';
import io from 'socket.io-client';

const getID = () => {
  const key = 'chat-id';
  if (!Cookies.get(key)) {
    Cookies.set(key, Math.floor((1 + Math.random()) * 0x10000).toString(16));
  }

  return Cookies.get(key);
}

class Store {
  constructor() {
    this.name = 'User';
    this.id = getID();
    this.socket = io();
    this.listeners = {};

    // bind instance methods to context
    this.sendMessage = this.sendMessage.bind(this);
    this.setListener = this.setListener.bind(this);
  }

  sendMessage(text) {
    this.socket.emit('message:new', { id: this.id, text });
  }

  setListener(evtName, cb) {
    const listener = this.socket.on(evtName, cb);
    Object.assign(this.listeners, { [evtName]: listener });
  }
}

const store = new Store();

export default store;
