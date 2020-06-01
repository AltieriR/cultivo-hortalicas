const AbstractService = require('../service/abstract.service');
const auth = require('../utils/jwt');
const User = require('../model/usuario.model');

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

addData = async (middleware, model) => {
  const { valor } = middleware.body;
  if (isNaN(valor)) return middleware.res.status(404).send(valor + ' is not a number!');
  await AbstractService.addData(model, middleware.body).then((doc) => {
    doc.valores.push(valor);
    return middleware.res.status(200).send(doc);
  }).catch(err => {
    return middleware.res.status(500).send(err);
  });
};

register = async (middleware, model) => {
  await AbstractService.persist(model, middleware.body).then((doc) => {    
    const token = auth.sign({ user: middleware.body.email });
    delete doc.senha;
    return middleware.res.status(200).send({ result: doc, token: token });
  }).catch(err => {
    return middleware.res.status(500).send(err.message);
  });
}

login = async (middleware, model) => {
  const [, hash] = middleware.headers.authorization.split(' ');
  const [email, senha] = Buffer.from(hash, 'base64').toString().split(':');

  await AbstractService.findByWithProjection(model, { email: email }, 'email senha').then((doc) => {
    doc.comparePassword(senha, (err, isMatch) => {
      if (err) {
        return middleware.res.status(401).send(err.message);
      } else if (isMatch) {
        const token = auth.sign({ user: email });
        delete doc.senha;
        return middleware.res.status(200).send({ result: doc, token: token });
      }
      return middleware.res.status(401);
    });
  }).catch(err => {
    return middleware.res.status(500).send(err.message);
  });
};

validateAuth = async (req, res, next) => {  
  if (await req.path.startsWith('/login') || await req.path.startsWith('/registrar')) {
    return next();
  }
  if (!req.headers.authorization) return;
  const token = await req.headers.authorization.split(' ')[1];
  
  if (token) {
    try {
      const payload = await auth.verify(token);
      await AbstractService.findOneBy(User, { email: payload.user }).then((doc) => {
        if (doc) {
          req.userLoggedIn = doc;
          next();
        } else {
          return res.status(404).send('Invalid user details');
        }
      }).catch(() => {        
        return res.sendStatus(401);
      });
    } catch (err) {
      return res.status(401).send(err.message);
    }
  } else {    
    return res.sendStatus(404);
  }
}

getUserInfoByToken = async (middleware, model) => {
  const token = middleware.headers.authorization.split(' ')[1];
  const payload = await auth.verify(token);
  
  await AbstractService.findAllBy(model, { email: payload.user }).then((doc) => {
    if (!doc[0]) throw Error('User not found');
    return middleware.res.status(200).send(doc[0]);
  }).catch(err => {
    console.log(err.message);
    return middleware.res.status(500).send(err.message);
  });
  
};

getByKey = async (middleware, model) => {
  AbstractService.findAllBy(model, middleware.query).then((doc) => {
    return middleware.res.status(200).send(doc);
  }).catch(err => {
    return middleware.res.status(500).send(err.message);
  });
};

module.exports = { create, read, readAll, update, remove, addData, register, login, validateAuth, getUserInfoByToken, getByKey };