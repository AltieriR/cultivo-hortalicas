const EstufaService = require('../service/estufa.service');

createEstufa = async (middleware, model) => {
  const obj = middleware.body;  
  try {
    await EstufaService.persist(model, obj);
    middleware.res.status(200).send('OK');
  } catch (e){
    console.log();
    console.log('Stack err: ' + e.stack);
    middleware.res.status(500).send('Error');
  }
}

getEstufa = async (middleware, model) => {
  const { id } = middleware.params;
  try {
    await EstufaService.findById(model, id);
  } catch (e){
    console.log(e.stack);
    middleware.res.status(500).send('Error');
  }
  middleware.res.status(200).send('OK');
};

module.exports = { createEstufa, getEstufa };