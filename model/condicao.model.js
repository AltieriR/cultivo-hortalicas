const mongoose = require('../database/config');

const CondicaoSchema = new mongoose.Schema({
  identificador: {
    type: String,
    required: true
  },
  operador: {
    type: String,
    required: true
  },
  valor_esperado: {
    type: String,
    required: true
  },
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor'
  },
  atuador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Atuador'
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

const Condicao = mongoose.model('Condicao', CondicaoSchema);

module.exports = Condicao;