import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { renderUser, renderMessages } from './dom';
import { genID } from './utils';

const getID = () => {
  const key = 'chat-id';
  if (!Cookies.get(key)) {
    Cookies.set(key, genID());
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
    this.updateUser = this.updateUser.bind(this);
    this.setListener = this.setListener.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  }

  renderUser(newUser) {
    const { name } = newUser;
    this.name = name;
    renderUser(newUser);
  }

  renderMessages(messages) {
    renderMessages(messages);
  }

  updateUser(user) {
    const { id } = this;
    this.socket.emit('user:update', Object.assign({}, { id }, user));
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
