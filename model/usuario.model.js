const mongoose = require('../database/config');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  usuario: {
    type: String,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  fone: {
    type: String
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

UsuarioSchema.pre('save', function(next) {
  bcrypt.hash(this.senha, 10, (err, hash) => {
    if (err) return next(err);
    this.senha = hash;
    next();
  })
});

UsuarioSchema.methods.comparePassword = function(possivelSenha, callback) {
  bcrypt.compare(possivelSenha, this.senha, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
}

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;