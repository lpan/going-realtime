import Rx from 'rxjs/Rx';
import store from './store';

const getEl = (id) => document.getElementById(id);

const setSendListener = () => {
  const button = getEl('message-input-send');
  const input = getEl('message-input-holder');

  const $clicks = Rx.Observable.fromEvent(button, 'click');
  const $presses = Rx.Observable.fromEvent(input, 'keydown')
  const $sends = Rx.Observable.merge($clicks, $presses.filter(e => e.key === 'Enter'));

  return $sends.subscribe(() => {
    store.sendMessage(input.value);
    input.value = '';
  });
};

const setListeners = () => {
  setSendListener();
};

export default setListeners;
