const express = require('express');
const router = express.Router();

const Estufa = require('../model/estufa.model');
const EstufaController = require('../controller/estufa.controller');

createEstufa = (middleware) => {
  EstufaController.createEstufa(middleware, Estufa);
}

getEstufa = (middleware) => {
  EstufaController.getEstufa(middleware, Estufa);
}

router.get('/estufa/:id', getEstufa);
router.post('/estufa', createEstufa);

module.exports = router;