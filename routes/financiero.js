'use strict'

var express = require('express');
var FinancieroController = require('../controllers/FinancieroController');


var api = express.Router();
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/instituciones'});

api.post('/agregar_proveedor',auth.auth,FinancieroController.agregar_proveedor);

api.get('/listar_proveedor',auth.auth,FinancieroController.listar_proveedor);

api.get('/listar_ctacontable',auth.auth,FinancieroController.listar_ctacontable);
api.post('/agregar_ctacontable',auth.auth,FinancieroController.agregar_ctacontable);

module.exports = api;