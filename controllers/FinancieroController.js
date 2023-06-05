//var AdminInstituto = require('../models/AdminInstituto');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');
let { months, suppressDeprecationWarnings } = require('moment');

let Estudiante = require('../models/Estudiante');
let Pension_Beca = require('../models/Pension_Beca');
let Config = require('../models/Config');
let Factura = require('../models/Facturacion');
let Documento = require('../models/Documento');
let Pago = require('../models/Pago');
let Dpago = require('../models/Dpago');
let Pension = require('../models/Pension');
let Registro = require('../models/Registro');
let Admin = require('../models/Admin');
let AdminInstituto = require('../models/AdminInstituto');
let Institucion = require('../models/Institucion');

let Proveedor = require('../models/Proveedor');
let Ctacontable = require('../models/Ctacontable');

const ConfigSchema = require('../models/Config');
const FacturaSchema = require('../models/Facturacion');
const AdminInstitutoSchema = require('../models/AdminInstituto');
const AdminSchema = require('../models/Admin');
const RegistroSchema = require('../models/Registro');
const VentaSchema = require('../models/Pago');
const PensionSchema = require('../models/Pension');
const EstudianteSchema = require('../models/Estudiante');
const DpagoSchema = require('../models/Dpago');
const Pension_becaSchema = require('../models/Pension_Beca');
const DocumentoSchema = require('../models/Documento');
const InstitucionSchema = require('../models/Institucion');

const ProveedorSchema = require('../models/Proveedor');
const CtacontableSchema  = require('../models/Ctacontable');

var mongoose = require('mongoose');


const agregar_proveedor = async function (req, res) {
	if (req.user) {
		try {
			var data = req.body;
			var cont=0;
			let conn = mongoose.connection.useDb(req.user.base);
			Proveedor = conn.model('proveedor', ProveedorSchema);
			for (const element of data) {
				var proveedor_arr = [];
				
				proveedor_arr = await Proveedor.find({ ruc: element.ruc });
				if(proveedor_arr.length==0){
					var reg = await Proveedor.create(element);
					cont=cont+1;
				}
			}
			res.status(200).send({ message: 'Registrado con exito: '+cont });
		} catch(error){
			console.log(error);
			res.status(200).send({ message: 'algo salio mal'});
		}
	}
}
const listar_proveedor = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Proveedor = conn.model('proveedor', ProveedorSchema);
			let proveedor_arr = await Proveedor.find({});

			res.status(200).send({ proveedores: proveedor_arr });
		} catch(error){
			res.status(200).send({ message: 'algo salio mal'});
		}
	}
}
const listar_ctacontable = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Ctacontable = conn.model('ctacontable', CtacontableSchema);
			let ctacontable = await Ctacontable.find({});

			res.status(200).send({ ctacontable: ctacontable });
		} catch(error){
			res.status(200).send({ message: 'algo salio mal'});
		}
	}
}
const agregar_ctacontable = async function (req, res) {
	if (req.user) {
	  try {
		var data = req.body;
		let conn = mongoose.connection.useDb(req.user.base);
		Ctacontable = conn.model('ctacontable', CtacontableSchema);

		for (const element of data) {
			let ctacon = [];
				
				ctacon = await Ctacontable.find({ codigo:element.codigo });
			
			if (ctacon.length == 0) {

				await Ctacontable.create(element);

			  } else {
				await Ctacontable.updateOne(
				  { _id: ctacon[0]._id },
				  {
					codigo: element.codigo,
					nombre: element.nombre,
					subcuentas: element.subcuentas
				  }
				);
			  }
		}
		res.status(200).send({ message: 'Registrado con éxito' });
	  } catch (error) {
		console.log(error);
		res.status(200).send({ message: 'Algo salió mal' });
	  }
	}
  }

module.exports = {
	agregar_proveedor,
	listar_proveedor,
	listar_ctacontable,
	agregar_ctacontable
};
