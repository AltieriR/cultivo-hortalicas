const mongoose = require('../database/config');

const ValorSchema = new mongoose.Schema({
  valor: {
    type: String,
    required: true
  },
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor'
  },
  data: {
    type: Date,
    default: Date.now
  },
  manual: {
    type: Boolean
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

const Valor = mongoose.model('Valor', ValorSchema);

module.exports = Valor;