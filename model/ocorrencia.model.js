const mongoose = require('../database/config');

const OcorrenciaSchema = new mongoose.Schema({
  causa: {
    type: String
  },
  estufa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estufa'
  },
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor'
  },
  quando: {
    type: Date,
    default: Date.now
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

const Ocorrencia = mongoose.model('Ocorrencia', OcorrenciaSchema);

module.exports = Ocorrencia;