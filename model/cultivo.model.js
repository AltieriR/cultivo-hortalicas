const mongoose = require('../database/config');

const CultivoSchema = new mongoose.Schema({
  identificador: {
    type: String,
    required: true
  },
  grupo: {
    type: String,
    required: true
  },
  controlador: {
    type: String,
    required: true
  },
  local: {
    type: String,
    required: true
  },
  observacoes: {
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

const Cultivo = mongoose.model('Cultivo', CultivoSchema);

module.exports = Cultivo;