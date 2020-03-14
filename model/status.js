var mongoose = require('mongoose');

var StatusSchema = new mongoose.Schema({
    nome: {
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

var Status = mongoose.model('Status', StatusSchema);

module.exports = Status;