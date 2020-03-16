const mongoose = require('../database/config');

const SensorSchema = new mongoose.Schema({
    identificador: {
        type: String,
        required: true
    },
    grandeza: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    },
    unidade: {
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

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;