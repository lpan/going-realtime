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
    this.message = '';
    this.socket = io();

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(message) {
    this.socket.emit('message:new', { id: this.id, message });
  }
}

const store = new Store();

export default store;
