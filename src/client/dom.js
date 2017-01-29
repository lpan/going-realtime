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

const renderID = (id) => {
  const holder = getEl('message-user-id');
  clearChildren(holder);
  holder.innerText = 'ID: ';
  holder.appendChild(makeBold(id));
};

const renderName = (name) => {
  const holder = getEl('message-user-name');
  clearChildren(holder);
  holder.innerText = 'Name: ';
  holder.appendChild(makeBold(name));
};

export const renderUser = ({ name, id }) => {
  renderID(id);
  renderName(name);
};

// messages - latest 50 message objects in ascending order (earliest -> latest)
export const renderMessages = (messages) => {
  const messagesHolder = getEl('messages');
  clearChildren(messagesHolder);
  messages
    .map(makeItem)
    .reverse()
    .forEach((item) => { messagesHolder.appendChild(item); });

  // scroll to the bottom of the message holder
  messagesHolder.scrollTop = messagesHolder.scrollHeight;
};
