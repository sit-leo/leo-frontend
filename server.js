const next = require('next');
const express = require('express');

const routes = require('./routes');


const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const PORT = process.env.PORT || 3000;
  express().use(handler).listen(PORT);
});
