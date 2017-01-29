import store from './store';
import setListeners from './listeners';

window.onload = () => {
  // set listeners for DOM events
  setListeners();

  // set listeners for socket.io events
  store.setListener('messages:return', store.renderMessages);
  store.setListener('user:return', store.renderUser);

  // get initial user info from db
  store.socket.emit('user:get', { id: store.id });
};
