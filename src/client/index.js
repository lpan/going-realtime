import store from './store';
import { renderUser, renderMessages } from './dom';
import setListeners from './listeners';

window.onload = () => {
  // get initial user info from db
  store.socket.emit('info:get', { id: store.id });

  // set listeners for DOM events
  setListeners();

  // set listeners for socket.io events
  store.setListener('messages:return', renderMessages);
  store.setListener('user:return', renderUser);
};
