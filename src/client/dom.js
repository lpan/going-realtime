const makeBold = (text) => {
  const el = document.createElement('b');
  el.innerText = text;
  return el;
}

const clearChildren = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

export const renderID = (id) => {
  const holder = document.getElementById('message-user-id');
  clearChildren(holder);
  holder.innerText = 'ID: ';
  holder.appendChild(makeBold(id));
};

export const renderName = (name) => {
  const holder = document.getElementById('message-user-name');
  clearChildren(holder);
  holder.innerText = 'Name: ';
  holder.appendChild(makeBold(name));
};
