const express = require('express');
const router = express.Router();
const AbstractController = require('../controller/abstract.controller');

let models = {};

create = (middleware) => {
  AbstractController.create(middleware, assignResource(middleware));
}

read = (middleware) => {
  AbstractController.read(middleware, assignResource(middleware));
}

getByKey = (middleware) => {
  AbstractController.getByKey(middleware, assignResource(middleware));
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

login = (middleware) => {
  AbstractController.login(middleware, require(`../model/usuario.model`));
}

assignResource = (middleware) => {
  const modelNameByPath = middleware.path.split('/').slice(1, 2)[0];
  return models[modelNameByPath] ?
    models[modelNameByPath] : models[modelNameByPath] = require(`../model/${modelNameByPath}.model`);
}

hasQueryParams = (req, res, next) => {
  return req.query.constructor === Object && Object.keys(req.query).length !== 0 ? next() : getByKey(req);
}

router.get('/cultivo?*', hasQueryParams, getByKey);
router.get('/cultivo/:id', read);
router.get('/cultivo', readAll);
router.post('/cultivo', create);
router.put('/cultivo', update);
router.delete('/cultivo/:id', remove);

router.get('/estufa?*', hasQueryParams, getByKey);
router.get('/estufa/:id', read);
router.get('/estufa', readAll);
router.post('/estufa', create);
router.put('/estufa', update);
router.delete('/estufa/:id', remove);

router.get('/sensor?*', hasQueryParams, getByKey);
router.get('/sensor/:id', read);
router.get('/sensor', readAll);
router.post('/sensor', create);
router.put('/sensor', update);
router.delete('/sensor/:id', remove);

router.get('/atuador?*', hasQueryParams, getByKey);
router.get('/atuador/:id', read);
router.get('/atuador', readAll);
router.post('/atuador', create);
router.put('/atuador', update);
router.delete('/atuador/:id', remove);

router.get('/condicao?*', hasQueryParams, getByKey);
router.get('/condicao/:id', read);
router.get('/condicao', readAll);
router.post('/condicao', create);
router.put('/condicao', update);
router.delete('/condicao/:id', remove);

router.get('/usuario?*', getByKey);
router.get('/usuario/:id', read);
router.get('/usuario', readAll);
router.post('/usuario', create);
router.put('/usuario', update);
router.delete('/usuario/:id', remove);
router.post('/login', login);

router.get('/ocorrencia?*', getByKey);
router.get('/ocorrencia/:id', read);
router.get('/ocorrencia', readAll);
router.post('/ocorrencia', create);
router.put('/ocorrencia', update);
router.delete('/ocorrencia/:id', remove);

module.exports = router;