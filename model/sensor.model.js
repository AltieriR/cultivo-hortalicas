const mongoose = require('../database/config');

const SensorSchema = new mongoose.Schema({
  identificador: {
    type: String,
    required: true
  },
  pino: {
    type: String
  },
  grandeza: {
    type: String,
    required: true
  },
  valores: [{
    type: String
  }],
  media: {
    type: String,
    default: function() {
      return this.valores.reduce((a, v) => Number(a) + Number(v), 0) / Number(this.valores.length);
    }
  },
  ultimaMedia: {
    type: String,
    default: function() {
      return this.valores.reduce((a, v, i) => i < 3 ? Number(a) + Number(v) : Number(a), 0) / Number(this.valores.length);
    }
  },
  unidade: {
    type: String,
    required: true
  },
  estufa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estufa'
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

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;