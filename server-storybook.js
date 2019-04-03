const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(`${__dirname}/storybook-static`));

const port = process.env.PORT || 80;
app.listen(port);
