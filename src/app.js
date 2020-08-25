require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDIC = require('./config/di');
const initCarModule = require('./module/car/module');

const app = express();
const port = 3000;

app.use(express.static('public'));

nunjucks.configure('src/module/car/views', {
  autoescape: true,
  express: app,
});

const container = configureDIC();

initCarModule(app, container);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
