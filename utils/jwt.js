const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports.sign = payload => jwt.sign(payload, secret, { algorithm: 'HS384', expiresIn: '3h' });
module.exports.verify = token => jwt.verify(token, secret);