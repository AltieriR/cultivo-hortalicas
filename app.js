const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routing = require('./route/estufa.route');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static('images'));

app.use(routing);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal error!');
});

app.listen(3000, () => {
  console.log('Up and running');
});