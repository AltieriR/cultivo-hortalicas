var mongoose = require('mongoose');

var EstufaSchema = new mongoose.Schema({
    grupo: {
        type: String, //verduras, legumes...
        unique: true,
        require: true,
        select: false
    },
    nome: {
        type: String,
        require: true
    },
    local: {
        type: String
    },
    descricao: {
        type: String
    },
    campo: {
        type: String,
        require: true
    },
    temperatura_maxima: {
        type: String,
        require: true
    },
    observacoes: {
        type: String,
        require: true
    },
    rentedBy: {
        type: String,
        require: true
    },
    createdBy: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedBy: {
        type: String,
        require: true
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
});

var Estufa = mongoose.model('Estufa', EstufaSchema);

module.exports = Estufa;