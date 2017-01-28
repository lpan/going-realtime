function getID() {
  var key = 'chat-id';
  if (!Cookies.get(key)) {
    Cookies.set(key, Math.floor((1 + Math.random()) * 0x10000).toString(16));
  }

  return Cookies.get(key);
}

function initState() {
  return {
    name: 'User',
    id: getID(),
    messages: []
  };
}

function makeBold(text) {
  var el = document.createElement('b');
  el.innerText = text;
  return el;
}

function clearChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function renderID(id) {
  var holder = document.getElementById('message-user-id');
  clearChildren(holder);
  holder.innerText = 'ID: ';
  holder.appendChild(makeBold(id));
}

function renderName(name) {
  var holder = document.getElementById('message-user-name');
  clearChildren(holder);
  holder.innerText = 'Name: ';
  holder.appendChild(makeBold(name));
}

window.onload = function () {
  var state = initState();

  var socket = io();
  socket.on('news', function (payload) {
    alert(payload.data);
  });

  renderID(state.id);
  renderName(state.name);
}
