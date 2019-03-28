const next = require('next');
const express = require('express');

const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  console.log('env => ', process.env);
  express().use(handler).listen(PORT);
});
