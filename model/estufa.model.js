const mongoose = require('../database/config');

const EstufaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  local: {
    type: String
  },
  descricao: {
    type: String
  },
  campo: {
    type: String,
    required: true
  },
  criadoPor: {
    type: String,
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  },
  modificadoPor: {
    type: String,
    required: true
  },
  modificadoEm: {
    type: Date,
    default: Date.now
  },
});

const Estufa = mongoose.model('Estufa', EstufaSchema);

module.exports = Estufa;