const express = require('express');
const router = express.Router();
const AbstractController = require('../controller/abstract.controller');

create = (middleware) => {
  AbstractController.create(middleware, assignResource(middleware));
}

read = (middleware) => {
  AbstractController.read(middleware, assignResource(middleware));
}

readAll =  (middleware) => {
  AbstractController.readAll(middleware, assignResource(middleware));
}

update = (middleware) => {
  AbstractController.update(middleware, assignResource(middleware));
}

remove = (middleware) => {
  AbstractController.remove(middleware, assignResource(middleware));
}

assignResource = (middleware) => {
  const objLowerCase = middleware.path.split('/').slice(1, 2)[0];
  return require(`../model/${objLowerCase.charAt(0).toUpperCase() + objLowerCase.slice(1)}.model`);
}

router.get('/estufa/:id', read);
router.get('/estufa', readAll);
router.post('/estufa', create);
router.put('/estufa', update);
router.delete('/estufa/:id', remove);

router.get('/sensor/:id', read);
router.get('/sensor', readAll);
router.post('/sensor', create);
router.put('/sensor', update);
router.delete('/sensor/:id', remove);

module.exports = router;