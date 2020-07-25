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
  let alreadyRegistered = false;
  await AbstractService.findAllBy(model, {email: middleware.body.email}).then((doc) => {
    if (doc[0]) {
      alreadyRegistered = true;
    }
  });
  console.log(alreadyRegistered);
  if (!alreadyRegistered) {
    await AbstractService.persist(model, middleware.body).then((doc) => {
      const token = auth.sign({ user: middleware.body.email });
      console.log(middleware.body.email);
      delete doc.senha;
      return middleware.res.status(200).send({ result: doc, token: token });
    }).catch(err => {
      return middleware.res.status(500).send(err.message);
    });
  }
  return middleware.res.status(409).send('User already existst');
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
      return middleware.res.status(401).send('Invalid credentials');
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

getDataBetweenDates = async (middleware, model) => {
  AbstractService.findDataBetweenDates(model, middleware.params.inicio, middleware.params.fim).then((doc) => {
    return middleware.res.status(200).send(doc);
  }).catch(err => {
    return middleware.res.status(500).send(err.message);
  });
};

randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

randomValue = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
}

generateRandomValues = async (middleware, model) => {
  let obj = middleware.body;
  let error = null;
  
  for (let i = 0; i < 10; i++) {
    obj.data = randomDate(new Date(2020, 1, 1), new Date());
    obj.valor = randomValue(20, 28);
    await AbstractService.persist(model, obj).catch(err => {
      error = err;
    });
  }

  if (!error) {
    return middleware.res.sendStatus(200);
  } else {
    return middleware.res.status(500).send(error.message);
  }

};

module.exports = { create, read, readAll, update, remove, addData, register, login, validateAuth, getUserInfoByToken, getByKey, getDataBetweenDates, generateRandomValues };