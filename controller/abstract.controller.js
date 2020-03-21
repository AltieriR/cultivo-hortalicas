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

login = async (middleware, model) => {
  const { usuario, senha } = middleware.body;
  await AbstractService.findByWithProjection(model, { 'usuario': usuario }, 'usuario senha').then((doc) => {
    doc.comparePassword(senha, (err, isMatch) => {
      if (err) {
        return middleware.res.status(500).send(err.message);
      } else if (isMatch) {
        delete doc.senha;
        return middleware.res.status(200).send(doc);
      }
      return middleware.res.status(401);
    });
  }).catch(err => {
    console.log(err.message);
    return middleware.res.sendStatus(404)
  });
};

module.exports = { create, read, readAll, update, remove, login };