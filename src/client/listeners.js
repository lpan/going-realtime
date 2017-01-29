import Rx from 'rxjs/Rx';
import store from './store';
import { renderModal, deleteModal } from './dom';

const getEl = (id) => document.getElementById(id);

const sendMessage = (inputNode) => () => {
  store.sendMessage(inputNode.value);
  inputNode.value = '';
};

const updateName = (modal) => (inputNode) => () => {
  store.updateUser({ name: inputNode.value });
  inputNode.value = '';
  deleteModal(modal);
};

const setName = () => {
  const modalID = renderModal('New Name', store.name);
  const inputListener = setInputListener(
    getEl(`${modalID}-button`),
    getEl(`${modalID}-input`),
    updateName(getEl(modalID))
  );
};

const setInputListener = (button, input, cb) => {
  const $clicks = Rx.Observable.fromEvent(button, 'click');
  const $presses = Rx.Observable.fromEvent(input, 'keydown')

  return Rx.Observable.merge($clicks, $presses.filter(e => e.key === 'Enter'))
    .subscribe(cb(input));
};

const setClickListener = (button, cb) => {
  const $clicks = Rx.Observable.fromEvent(button, 'click');

  return $clicks.subscribe(cb);
}

const setListeners = () => {
  // send message listener
  setInputListener(getEl('message-input-send'), getEl('message-input-holder'), sendMessage);

  // open change name modal listener
  setClickListener(getEl('message-user-name-change'), setName);
};

export default setListeners;
