const next = require('next');
const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const PORT = process.env.PORT || 3000;
  const server = express();
  server.use(cookieParser());
  server.use(handler).listen(PORT);
});
