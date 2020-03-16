const Estufa = require('../model/estufa.model');
const mongoose = require('../database/config');

persist = (MongooseSchema, obj) => {
  var ob = new MongooseSchema(obj);
  ob.save(function (err) {
    if (err) throw err.message;
  });
}

findById = async (MongooseSchema, id) => {
  console.log('finding: '  + id);
  const doc = MongooseSchema.findById(id);
  //console.log(doc);
}

module.exports = { persist, findById };