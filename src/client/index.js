import store from './store';
import { renderName, renderID } from './dom';
import setListeners from './listeners';

window.onload = () => {
  renderID(store.id);
  renderName(store.name);

  setListeners();
};
