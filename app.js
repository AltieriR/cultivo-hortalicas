//const routing = require('./../controller/routing.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static('images'));

//app.use(routing);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal error!');
});

app.listen(3000);