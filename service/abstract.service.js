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

module.exports = { persist, findById, findAll, put, del };