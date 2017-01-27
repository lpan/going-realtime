const path = require('path');
const fs = require('fs');
const koa = require('koa');
const serve = require('koa-static');
const app = koa();

const PORT = 3000;

const PUBLIC_PATH = path.join(__dirname, '..', 'public');

app.use(serve(PUBLIC_PATH));

app.listen(PORT);

console.log(`Server listening on port ${PORT}`);
