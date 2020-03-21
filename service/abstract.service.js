persist = async (MongooseSchema, obj) => {
  return MongooseSchema.create(obj);
}

findById = async (MongooseSchema, id) => {
  return MongooseSchema.findById(id);
}

findAll = async (MongooseSchema) => {
  return MongooseSchema.find();
}

put = async (MongooseSchema, obj) => {  
  return MongooseSchema.findByIdAndUpdate(obj._id, obj, { upsert: true });
}

del = async (MongooseSchema, id) => {
  return MongooseSchema.findByIdAndDelete(id);
}

findBy = async (MongooseSchema, conditions) => {
  return MongooseSchema.findOne(conditions);
}

findByWithProjection = async (MongooseSchema, conditions, projection) => {
  return MongooseSchema.findOne(conditions).select(projection);
}

module.exports = { persist, findById, findAll, put, del, findBy, findByWithProjection };