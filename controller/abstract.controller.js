const AbstractService = require('../service/abstract.service');

create = async (middleware, model) => {
  AbstractService.persist(model, middleware.body).then((doc) => {
    return middleware.res.status(200).send(doc);
  }).catch(err => {
    return middleware.res.status(500).send(err.message);
  });
}

read = async (middleware, model) => {
  AbstractService.findById(model, middleware.params.id).then((doc) => {
    return middleware.res.status(200).send(doc);
  }).catch(() => {
    return middleware.res.sendStatus(404);
  });
};

readAll = async (middleware, model) => {
  AbstractService.findAll(model).then((doc) => {
    return middleware.res.status(200).send(doc);
  }).catch(err => {
    return middleware.res.status(500).send(err.message);
  });
};

update = async (middleware, model) => {
  AbstractService.put(model, middleware.body).then((doc) => {
    return middleware.res.status(200).send(doc);
  }).catch(err => {
    return middleware.res.status(500).send(err);
  });
}

remove = async (middleware, model) => {
    AbstractService.del(model, middleware.params.id).then((doc) =>{
      return middleware.res.status(200).send(doc);
    }).catch(() => {
      return middleware.res.sendStatus(404);
    });
};

module.exports = { create, read, readAll, update, remove };