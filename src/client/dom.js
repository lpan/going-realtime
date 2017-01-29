const getEl = (id) => document.getElementById(id);

const makeBold = (text) => {
  const el = document.createElement('b');
  el.innerText = text;
  return el;
}

const makeItem = (message) => {
  const el = document.createElement('li');
  const { id, text } = message;
  el.innerText = `id: ${id} --- ${text}`;
  return el;
}

const clearChildren = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

export const renderID = (id) => {
  const holder = getEl('message-user-id');
  clearChildren(holder);
  holder.innerText = 'ID: ';
  holder.appendChild(makeBold(id));
};

export const renderName = (name) => {
  const holder = getEl('message-user-name');
  clearChildren(holder);
  holder.innerText = 'Name: ';
  holder.appendChild(makeBold(name));
};

export const renderMessages = (messages) => {
  const messagesHolder = getEl('messages');
  clearChildren(messagesHolder);
  messages.map(makeItem).forEach((item) => { messagesHolder.appendChild(item); });

  // scroll to the bottom of the message holder
  messagesHolder.scrollTop = messagesHolder.scrollHeight;
};
