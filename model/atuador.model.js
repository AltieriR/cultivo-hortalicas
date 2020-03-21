const mongoose = require('../database/config');

const AtuadorSchema = new mongoose.Schema({
  identificador: {
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

const Atuador = mongoose.model('Atuador', AtuadorSchema);

module.exports = Atuador;