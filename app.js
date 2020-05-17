const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const validateAuth = require('./controller/abstract.controller').validateAuth;

const routing = require('./route/routes');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static('images'));

app.use(validateAuth);

app.use(routing);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal error!');
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Up and running into :' + process.env.PORT || 3001);
});