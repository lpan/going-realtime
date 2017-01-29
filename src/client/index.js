import store from './store';
import { renderName, renderID, renderMessages } from './dom';
import setListeners from './listeners';

window.onload = () => {
  renderID(store.id);
  renderName(store.name);

  setListeners();

  store.socket.on('messages:update', (messages) => {
    renderMessages(messages);
  });
};
