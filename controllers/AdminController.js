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
/*
let conn = mongoose.connection.useDb(req.user.base);

Admin=conn.model('admin',AdminSchema);
Registro=conn.model('registro',RegistroSchema);
Pago=conn.model('pago',VentaSchema);
Config=conn.model('config',ConfigSchema);
Pension=conn.model('pension',PensionSchema);
Pension_Beca=conn.model('pension_beca',Pension_becaSchema);
Estudiante=conn.model('estudiante',EstudianteSchema);
Documento=conn.model('document',DocumentoSchema);
Dpago=conn.model('dpago',DpagoSchema);
*/
var mongoose = require('mongoose');


const getDashboar_estudiante = async function (req, res) {
	if (req.user) {
		try {
			let obj=''
			let ms=''
			const filePath = './uploads/dashboar_estudiante.json'

			if (fs.existsSync(filePath)) {
				fs.stat(filePath, (err, stat) => {
					if (err) {
					  // Manejar el error aquí
					  return res.status(400).json({ message: 'Algo salio mal' + err });
					} else if (stat.size === 0) {
					  console.log('El archivo JSON está vacío');
					} else {
					  // El archivo no está vacío, se puede analizar sin problemas
					  const contenido = fs.readFileSync(filePath, 'utf8');
					  obj = JSON.parse(contenido);
					  
					}
				  });

				
				
			}else{
				ms='No existe el archivo';
			}
			return res.status(200).json({ obj: obj, ms:ms });
		} catch (error) {
			return res.status(400).json({ message: 'Algo salio mal' + error });
		}
	}
}

const actualizzas_dash = async function (req, res) {
	if (req.user) {
		try {
			
			const filePath = './uploads/dashboar_estudiante.json'
			const fileContent =JSON.stringify(req.body);

			if (!fs.existsSync(filePath)) {
				
			fs.writeFileSync(filePath, fileContent);
			}else{
				
				fs.writeFileSync(filePath, fileContent);
			}
			return res.status(200).json({ message: 'Guardado con exito' });
		} catch (error) {
			
			return res.status(400).json({ message: 'Algo salio mal' + error });
		}
	}
}

const forgotpassword = async function (req, res) {
	var data = req.body;
	//console.log(req.body);
	if (!data) {
		return res.status(400).json({ message: 'Usuario requerido' });
	}

	try {
		let conn = mongoose.connection.useDb('Instituciones');
		AdminInstituto = conn.model('admininstitutos', AdminInstitutoSchema);
		let brujula = await AdminInstituto.find();

		for (let index = 0; index < brujula.length; index++) {
			const element = brujula[index];

			conn = mongoose.connection.useDb(element.base);
			Admin = conn.model('admin', AdminSchema);
			admin_arr = await Admin.find({ email: data.email });
			if (admin_arr.length != 0) {
				if (element.estado != 'deshabilitado') {
					const tokenfp = jwt.sign(admin_arr[0]);
					//verificarlink = 'http://localhost:4200/' + `new-password/${tokenfp}`;
					verificarlink = 'http://incorp.tk/' + `new-password/${tokenfp}`;
					admin_arr[0].password = undefined;
					//console.log(verificarlink);
					//console.log(admin_arr[0]);
					enviar_password(verificarlink, admin_arr[0]);

					return res.status(200).json({ message: 'Revisa tu bandeja de mensajes' });
				} else {
					return res.status(200).json({ message: 'Su institución se encuentra Deshabilitada' });
				}
			}
		}
	} catch (error) {
		return res.status(200).json({ message: 'Revisa tu bandeja de mensajes' });
	}
};
const obtener_portada = async function (req, res) {
	var img = req.params['img'];

	fs.stat('./uploads/instituciones/' + img, function (err) {
		if (!err) {
			let path_img = './uploads/instituciones/' + img;
			res.status(200).sendFile(path.resolve(path_img));
		} else {
			let path_img = './uploads/default.jpg';
			res.status(200).sendFile(path.resolve(path_img));
		}
	});
};

const enviar_password = async function (link, userdata) {
	try {
		var readHTMLFile = function (path, callback) {
			fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
				if (err) {
					throw err;
					callback(err);
				} else {
					callback(null, html);
				}
			});
		};

		var transporter = nodemailer.createTransport(
			smtpTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
				auth: {
					//user: 'saamare99@gmail.com',
					//pass: 'hxnnpwpthnirvxbo',
					user: 'incorp.odoo1@gmail.com',
					pass: 'vnixbyewlzmrqchw',
				},
			})
		);

		readHTMLFile(process.cwd() + '/mails/email_password.html', (err, html) => {
			let rest_html = ejs.render(html, { userdata: userdata, link: link });

			var template = handlebars.compile(rest_html);
			var htmlToSend = template({ op: true });

			var mailOptions = {
				//from: 'saamare99@gmail.com',
				from: 'incorp.odoo1@gmail.com',
				to: userdata.email,
				subject: 'Cambio de contraseña',
				html: htmlToSend,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (!error) {
					console.log('Email sent: ' + info.response);
				}
			});
		});
	} catch (error) {
		res.status(200).send({ message: 'Algo salio mal' });
	}
};

const newpassword = async function (req, res) {
	if (req.user) {
		try {
			var data = req.body;
			//console.log(req.user);
			//console.log(data);
			let conn = mongoose.connection.useDb(req.user.base);
			Admin = conn.model('admin', AdminSchema);
			Registro = conn.model('registro', RegistroSchema);
			bcrypt.hash(data.password, null, null, async function (err, hash) {
				if (hash) {
					data.password = hash;
					await Admin.updateOne(
						{ _id: req.user.sub },
						{
							password: data.password,
						}
					);
					let registro = {};
					////////console.log(req.user);
					registro.admin = req.user.sub;
					registro.tipo = 'actualizo';
					registro.descripcion = JSON.stringify(data);
					await Registro.create(registro);
					res.status(200).send({ message: 'Actualizado con exito' });
				}
			});
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(200).send({ message: 'NoAccess' });
	}
};

const registrar_admin = async function (req, res) {
	try {
		////console.log(req);
		var data = req.body;
		// //console.log(data);
		var admin_arr = [];
		var base_arr = [];
		let conn = mongoose.connection.useDb('Instituciones');
		AdminInstituto = conn.model('admininstitutos', AdminInstitutoSchema);
		Institucion = conn.model('instituto', InstitucionSchema);
		Registro = conn.model('registro', RegistroSchema);

		admin_arr = await AdminInstituto.find({ email: data.email });
		base_arr = await AdminInstituto.find({ base: data.base });
		/// //console.log(admin_arr.length);
		// //console.log(base_arr.length);
		if (admin_arr.length == 0 && base_arr.length == 0) {
			bcrypt.hash(data.password, null, null, async function (err, hash) {
				if (hash) {
					data.password = hash;
					data.estado = 'habilitado';
					data.rol = 'admin';
					var img_path = req.files.portada.path;
					var name = img_path.split('/');
					var portada_name = name[2];
					data.portada = portada_name;

					var reg = await AdminInstituto.create(data);
					////console.log(reg);
					data.idadmin = reg._id;

					var reg1 = await Institucion.create(data);
					// //console.log(reg1);

					let registro = {};
					////////console.log(req.user);
					registro.admin = reg._id;
					registro.tipo = 'Registro';
					registro.descripcion = JSON.stringify(data);
					////////console.log(registro);
					await Registro.create(registro);
					let conn = mongoose.connection.useDb(reg.base.toString());
					AdminInstituto = conn.model('admininstitutos', AdminInstitutoSchema);

					Admin = conn.model('admin', AdminSchema);

					//var reg = await AdminInstituto.create(reg);

					var reg = await Admin.create(data);

					res.status(200).send({ message: 'Registrado con exito' });
				} else {
					res.status(200).send({ message: 'ErrorServer' });
				}
			});
		} else {
			if (admin_arr.length > 0) {
				res.status(200).send({ message: 'Ya estás registrado', data: undefined });
			} else if (base_arr.length > 0) {
				res.status(200).send({ message: 'Ya existe la base de datos', data: undefined });
			}
		}
	} catch (error) {
		res.status(200).send({ message: 'Algo salio mal' });
	}
};
const cambiar_base = async function (req, res) {
	if (req.user.email == 'samuel.arevalo@espoch.edu.ec') {
		//console.log(req.user);
		var data1 = req.body;

		var admin_arr = [];
		let conn = mongoose.connection.useDb('Instituciones');
		AdminInstituto = conn.model('admininstitutos', AdminInstitutoSchema);
		admin_arr = await AdminInstituto.find({ base: data1.base });

		if (admin_arr.length != 0) {
			req.user.portada = admin_arr[0].portada;
			req.user.rol='admin';
			req.user.base = data1.base;
			req.user._id = req.user.sub;
			res.status(200).send({
				data: req.user,
				token: jwt.createToken(req.user),
			});
		} else {
			res.status(200).send({ message: 'Base de datos no encontrada' });
		}
	}
};

const login_admin = async function (req, res) {
	var data = req.body;
	var admin_arr = [];
	let conn = mongoose.connection.useDb('Instituciones');
	AdminInstituto = conn.model('admininstitutos', AdminInstitutoSchema);
	
	admin_arr = await AdminInstituto.find({ email: data.email });
	try {
		let messages='';
		if (admin_arr.length == 0) {
			let brujula = await AdminInstituto.find();
			for (let index = 0; index < brujula.length; index++) {
				const element = brujula[index];

				conn = mongoose.connection.useDb(element.base);
				Admin = conn.model('admin', AdminSchema);
				admin_arr = await Admin.find({ email: data.email });
				if (admin_arr.length != 0) {
					let user = admin_arr[0];
					if (element.estado != 'deshabilitado') {
						bcrypt.compare(data.password, user.password, async function (error, check) {
							if (check) {          
								res.status(200).send({
									data: user,
									token: jwt.createToken(user),
								});
								         
							} else {
								//messages= 'Las credenciales no coinciden'
								res.status(200).send({messages: 'Las credenciales no coinciden' , data: undefined });
							}
						});
						break;           
					} else {
						//messages= 'Su institución se encuentra Deshabilitada'
						res.status(200).json({messages: 'Su institución se encuentra Deshabilitada'  });
						break; 
					}
				}
			}

			if (admin_arr.length == 0) {
				res.status(200).send({ message: 'El correo electrónico no existe', data: undefined });
			}
		} else {
			//LOGIN
			if (admin_arr[0].estado != 'deshabilitado' && admin_arr[0].rol != 'control') {
				conn = mongoose.connection.useDb(admin_arr[0].base);
				Admin = conn.model('admin', AdminSchema);
				let aux = await Admin.find({ email: data.email });
				//console.log(aux[0]);
				let user = aux[0];

				bcrypt.compare(data.password, user.password, async function (error, check) {
					if (check) {
						res.status(200).send({
							data: user,
							token: jwt.createToken(user),
						});
					} else {
						res.status(200).send({ message: 'Las credenciales no coinciden', data: undefined });
					}
				});
			} else if (admin_arr[0].rol == 'control') {
				bcrypt.compare(data.password, admin_arr[0].password, async function (error, check) {
					if (check) {
						res.status(200).send({
							data: admin_arr[0],
							token: jwt.createToken(admin_arr[0]),
						});
					} else {
						res.status(200).send({ message: 'Las credenciales no coinciden', data: undefined });
					}
				});
			} else {
				res.status(200).send({
					message: 'Tu base de Datos se encuentra deshabilitado por falta de pagos',
					data: undefined,
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.status(200).send({ message: 'ERROR No existe tu base de datos' });
	}
};

const listar_admininstitucion = async function (req, res) {
	if (req.user.email == 'samuel.arevalo@espoch.edu.ec') {
		try {
			var admin_arr = [];
			let conn = mongoose.connection.useDb('Instituciones');
			Institucion = conn.model('instituto', InstitucionSchema);
			AdminInstituto = conn.model('admininstitutos', AdminInstitutoSchema);
			admin_arr = await Institucion.find().populate('idadmin');
			//console.log(admin_arr);
			res.status(200).send({ data: admin_arr });
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
const actualizar_admininstitucion = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb('Instituciones');
			AdminInstituto = conn.model('admininstitutos', AdminInstitutoSchema);
			Registro = conn.model('registro', RegistroSchema);
			var id = req.params['id'];

			admin_arr = await AdminInstituto.find({ _id: id });
			if (admin_arr.length == 0) {
				res.status(200).send({ message: 'No se pudo encontrar' });
			} else {
				if (admin_arr[0].estado != 'deshabilitado') {
					await AdminInstituto.updateOne(
						{ _id: id },
						{
							estado: 'deshabilitado',
						}
					);
					let registro = {};
					////////console.log(req.user);
					registro.admin = req.user.sub;
					registro.tipo = 'deshabilitado';
					registro.descripcion = JSON.stringify( admin_arr[0]);
					await Registro.create(registro);
					res.status(200).send({ message: 'Actualizado con exito' });
				} else {
					await AdminInstituto.updateOne(
						{ _id: id },
						{
							estado: 'habilitado',
						}
					);
					let registro = {};
					////////console.log(req.user);
					registro.admin = req.user.sub;
					registro.tipo = 'habilitado';
					registro.descripcion = JSON.stringify( admin_arr[0]);
					await Registro.create(registro);
					res.status(200).send({ message: 'Actualizado con exito' });
				}
			}
		} catch (error) {
			////////console.log(error);
			res.status(200).send({ message: error + 'Algo salió mal', data: undefined });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const registro_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Admin = conn.model('admin', AdminSchema);
			Registro = conn.model('registro', RegistroSchema);

			var data = req.body;
			var admin_arr = [];
			admin_arr = await Admin.find({ email: data.email });

			var admin_arr2 = [];
			admin_arr2 = await Admin.find({ dni: data.dni });

			var admin_arr3 = [];
			admin_arr3 = await Admin.find({ rol: 'direc' });

			if (admin_arr.length == 0 && admin_arr2.length == 0) {
				if ((admin_arr3.length != 0 && data.rol != 'direc') || admin_arr3.length == 0) {
					try {
						bcrypt.hash(data.password, null, null, async function (err, hash) {
							if (hash) {
								data.password = hash;
								data.estado = 'habilitado';
								var reg = await Admin.create(data);

								let registro = {};
								////////console.log(req.user);
								registro.admin = req.user.sub;
								registro.tipo = 'creo';
								registro.descripcion = JSON.stringify(data);
								////////console.log(registro);

								await Registro.create(registro);
								res.status(200).send({ message: 'Registrado con exito' });
							} else {
								res.status(200).send({ message: 'ErrorServer' });
							}
						});
					} catch (error) {
						res.status(200).send({ message: 'Algo salió mal' });
					}
				} else {
					res.status(200).send({ message: 'Ya hay una cuenta con el rol de Director' });
				}
			} else {
				if (
					(admin_arr.length != 0 && admin_arr[0].estado == 'Fuera') ||
					(admin_arr2.length != 0 && admin_arr2[0].estado == 'Fuera') ||
					(admin_arr3.length != 0 && admin_arr3[0].estado == 'Fuera')
				) {
					try {
						bcrypt.hash(data.password, null, null, async function (err, hash) {
							if (hash) {
								data.password = hash;
								data.estado = 'habilitado';
								var reg = await Admin.updateOne(
									{ email: data.email },
									{
										nombres: data.nombres,
										apellidos: data.apellidos,
										password: data.password,
										rol: 'secrt',
										dni: data.dni,
										telefono: data.telefono,
										estado: data.estado,
									}
								);

								let registro = {};
								////////console.log(req.user);
								registro.admin = req.user.sub;
								registro.tipo = 'creo';
								registro.descripcion = JSON.stringify(data);
								////////console.log(registro);

								await Registro.create(registro);
								res.status(200).send({ message: 'Registrado con exito' });
							} else {
								res.status(200).send({ message: 'ErrorServer' });
							}
						});
					} catch (error) {
						res.status(200).send({ message: 'Algo salió mal' });
					}
				} else {
					res.status(200).send({ message: 'El correo y/o la cedula ya existe en la base de datos' });
				}
			}
		} catch (error) {
			res.status(200).send({ message: 'Algo salió mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
const listar_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Admin = conn.model('admin', AdminSchema);
			var admin_arr = [];
			admin_arr = await Admin.find({});

			res.status(200).send({ data: admin_arr });
		} catch (error) {
			res.status(200).send({ message: 'Algo salió mal', data: undefined });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
const listar_registro = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Registro = conn.model('registro', RegistroSchema);
			Admin = conn.model('admin', AdminSchema);
			Pago = conn.model('pago', VentaSchema);
			Config = conn.model('config', ConfigSchema);
			Estudiante = conn.model('estudiante', EstudianteSchema);
			Documento = conn.model('document', DocumentoSchema);
			var admin_arr = [];

			admin_arr = await Registro.find({})
				.sort({ createdAt: -1 })
				.populate('admin')
				.populate('estudiante')
				.populate('pago')
				.populate('documento')
				.populate('config');
			// console.log(admin_arr.length);
			res.status(200).send({ data: admin_arr });
		} catch (error) {
			res.status(200).send({ message: 'Algo salió mal', data: undefined });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
const obtener_admin = async function (req, res) {
	//console.log(req.user);
	if (req.user.email != 'samuel.arevalo@espoch.edu.ec') {
		var id = req.params['id'];
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Admin = conn.model('admin', AdminSchema);
			let estudiante = await Admin.findById({ _id: id });

			res.status(200).send({ data: estudiante });
		} catch (error) {
			res.status(200).send({ data: undefined });
		}
	} else if (req.user.email == 'samuel.arevalo@espoch.edu.ec') {
		var admin_arr = [];
		let conn = mongoose.connection.useDb('Instituciones');
		AdminInstituto = conn.model('admininstitutos', AdminInstitutoSchema);
		//console.log(req.user.sub);
		admin_arr = await AdminInstituto.findById(req.user.sub);
		//console.log(admin_arr);
		admin_arr.rol = 'admin';
		res.status(200).send({ data: admin_arr });
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
const actualizar_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Admin = conn.model('admin', AdminSchema);
			Registro = conn.model('registro', RegistroSchema);
			var id = req.params['id'];
			var data = req.body;
			let admin = await Admin.findById(id);
			////////console.log(admin);
			////////console.log('Data:',data);
			var admin_arr = [];
			var aux = await Admin.find();
			aux = aux.filter((item) => item.dni == data.dni);
			aux = aux.filter((item) => item._id != id);
			admin_arr = await Admin.find({ email: data.email });
			////////console.log('1:',admin_arr);
			admin_arr = admin_arr.filter((item) => item._id != id);
			////////console.log('2:',admin_arr);
			if (admin_arr.length == 1 || aux.length >= 1) {
				res.status(200).send({ message: 'Correo o cedula ya existente', data: undefined });
			} else {
				if (data.password != '') {
					bcrypt.hash(data.password, null, null, async function (err, hash) {
						if (hash) {
							data.password = hash;
							////////console.log(data.password);
							var admin_arr3 = [];
							admin_arr3 = await Admin.find({ rol: 'direc', _id: { $ne: id } });
							if ((admin_arr3.length != 0 && data.rol != 'direc') || admin_arr3.length == 0) {
								await Admin.updateOne(
									{ _id: id },
									{
										estado: data.estado,
										nombres: data.nombres,
										apellidos: data.apellidos,
										email: data.email,
										password: data.password,
										telefono: data.telefono,
										rol: data.rol,
										dni: data.dni,
									}
								);
								let registro = {};
								////////console.log(req.user);
								registro.admin = req.user.sub;
								registro.tipo = 'actualizo';
								registro.descripcion = JSON.stringify(admin) + JSON.stringify(data);

								////////console.log(registro);

								await Registro.create(registro);
								res.status(200).send({ message: 'Actualizado con exito' });
							} else {
								await Admin.updateOne(
									{ _id: id },
									{
										estado: data.estado,
										nombres: data.nombres,
										apellidos: data.apellidos,
										email: data.email,
										password: data.password,
										telefono: data.telefono,
										rol: 'secrt',
										dni: data.dni,
									}
								);
								let registro = {};
								////////console.log(req.user);
								registro.admin = req.user.sub;
								registro.tipo = 'actualizo';
								registro.descripcion = JSON.stringify(admin) + JSON.stringify(data);
								////////console.log(registro);

								await Registro.create(registro);
								res.status(200).send({ message: 'Actualizado con exito se cambio el rol a Colecturía' });
							}
						} else {
							res.status(200).send({ message: 'ErrorServer', data: undefined });
						}
					});
				} else {
					var admin_arr3 = [];
					admin_arr3 = await Admin.find({ rol: 'direc', _id: { $ne: id } });
					if ((admin_arr3.length != 0 && data.rol != 'direc') || admin_arr3.length == 0) {
						await Admin.updateOne(
							{ _id: id },
							{
								estado: data.estado,
								nombres: data.nombres,
								apellidos: data.apellidos,
								email: data.email,

								telefono: data.telefono,
								rol: data.rol,
								dni: data.dni,
							}
						);
						let registro = {};
						////////console.log(req.user);
						registro.admin = req.user.sub;
						registro.tipo = 'actualizo';
						registro.descripcion =JSON.stringify(admin) + JSON.stringify(data);

						////////console.log(registro);

						await Registro.create(registro);
						res.status(200).send({ message: 'Actualizado con exito' });
					} else {
						await Admin.updateOne(
							{ _id: id },
							{
								estado: data.estado,
								nombres: data.nombres,
								apellidos: data.apellidos,
								email: data.email,
								password: data.password,
								telefono: data.telefono,
								rol: 'secrt',
								dni: data.dni,
							}
						);
						let registro = {};
						////////console.log(req.user);
						registro.admin = req.user.sub;
						registro.tipo = 'actualizo';
						registro.descripcion =JSON.stringify(admin) + JSON.stringify(data);
						////////console.log(registro);

						await Registro.create(registro);
						res.status(200).send({ message: 'Actualizado con exito se cambio el rol a Colecturía' });
					}
				}
			}
		} catch (error) {
			////////console.log(error);
			res.status(200).send({ message: error + 'Algo salió mal', data: undefined });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const eliminar_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Admin = conn.model('admin', AdminSchema);
			Registro = conn.model('registro', RegistroSchema);
			var id = req.params['id'];
			var data = await Admin.findById(id);
			await Admin.updateOne(
				{ _id: id },
				{
					rol: 'secrt',
					estado: 'Fuera',
				}
			);
			let registro = {};
			////////console.log(req.user);
			registro.admin = req.user.sub;
			registro.tipo = 'elimino';
			registro.descripcion = JSON.stringify(data);
			await Registro.create(registro);

			res.status(200).send({ message: 'Eliminado con exito' });
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const eliminar_estudiante_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Registro = conn.model('registro', RegistroSchema);
			Pago = conn.model('pago', VentaSchema);
			Config = conn.model('config', ConfigSchema);
			Pension = conn.model('pension', PensionSchema);
			Estudiante = conn.model('estudiante', EstudianteSchema);
			Pension_Beca = conn.model('pension_beca', Pension_becaSchema);
			var id = req.params['id'];
			var data = await Estudiante.findById(id);
			var cn = await Config.find().sort({ createdAt: -1 }); //await Config.findById({_id:'61abe55d2dce63583086f108'});
			let config = cn[0];
			//let config = await Config.findById({_id:'61abe55d2dce63583086f108'});
			let pagos = await Pago.find({ estudiante: id });
			let pen = await Pension.find({ idestudiante: id });
			if (pen.length==1&& pagos.length == 0) {
				let registro = {};
				////////console.log(req.user);
				registro.admin = req.user.sub;
				registro.estudiante = id;
				registro.tipo = 'eliminado Permanente';
				registro.descripcion = JSON.stringify(data);
				let re = await Registro.create(registro);

				await Estudiante.findOneAndDelete({ _id: id });
				for (let pn in pen) {
					await Pension_Beca.findOneAndDelete({ idpension: pn._id });
				}

				await Pension.findOneAndDelete({ idestudiante: id });

				res.status(200).send({ message: 'Eliminado Permanentemente' });
			} else {
				await Estudiante.updateOne(
					{ _id: id },
					{
						estado: 'Desactivado',
						f_desac: new Date(),
						anio_desac: config.anio_lectivo,
					}
				);
				let registro = {};
				////////console.log(req.user);
				registro.admin = req.user.sub;
				registro.estudiante = id;
				registro.tipo = 'eliminado';
				registro.descripcion = JSON.stringify(data);
				await Registro.create(registro);

				res.status(200).send({ message: 'Eliminado con exito' });
			}
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const reactivar_estudiante_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Registro = conn.model('registro', RegistroSchema);
			Config = conn.model('config', ConfigSchema);
			Pension = conn.model('pension', PensionSchema);
			var id = req.params['id'];
			var pension = {};
			var data = await Estudiante.findById(id);
			await Estudiante.updateOne(
				{ _id: id },
				{
					estado: 'Activo',
				}
			);
			let registro = {};
			////////console.log(req.user);
			registro.admin = req.user.sub;
			registro.estudiante = id;
			registro.tipo = 'recreo';
			registro.descripcion = JSON.stringify(data);

			await Registro.create(registro);

			var cn = await Config.find().sort({ createdAt: -1 }); //await Config.findById({_id:'61abe55d2dce63583086f108'});
			let config = cn[0];
			let pen = await Pension.find({ idestudiante: id, idanio_lectivo: config._id });
			if (pen.length == 0) {
				pension.idestudiante = id;
				pension.anio_lectivo = config.anio_lectivo;
				pension.idanio_lectivo = config._id;
				pension.condicion_beca = 'No';
				pension.matricula = 0;
				pension.curso = data.curso;
				pension.paralelo = data.paralelo;

				////////console.log(pension);
				var reg2 = await Pension.create(pension);
				res.status(200).send({ message: 'Reactivado' });
			} else {
				res.status(200).send({ message: 'Reactivado pension existente' });
			}
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const registro_documento_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Registro = conn.model('registro', RegistroSchema);
			Documento = conn.model('document', DocumentoSchema);
			let data = req.body;

			let documentos = await Documento.find({ documento: data.documento });
			////////console.log(documentos);

			if (documentos.length == 0) {
				let reg = await Documento.create(data);
				let registro = {};
				////////console.log(req.user);
				registro.admin = req.user.sub;
				registro.tipo = 'creo';
				registro.descripcion = JSON.stringify(data);

				await Registro.create(registro);

				res.status(200).send({ data: reg });
			} else {
				res.status(200).send({ data: undefined, message: 'El número del documento ya existe' });
			}
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const listar_documentos_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Documento = conn.model('document', DocumentoSchema);
			var documentos = await Documento.find().sort({ createdAt: -1 });
			res.status(200).send({ data: documentos });
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
const obtener_documento_admin = async function (req, res) {
	if (req.user) {
		let conn = mongoose.connection.useDb(req.user.base);
		Dpago = conn.model('dpago', DpagoSchema);
		Documento = conn.model('document', DocumentoSchema);
		var id = req.params['id'];
		try {
			var reg = await Documento.findById({ _id: id });
			var detal = await Dpago.find({documento:id});
			let fact=[];
			for (const aux of detal) {
				if(fact.find((idfactura) => idfactura == aux.pago.toString()) == undefined){
					fact.push(aux.pago.toString());
				}	
			}
			res.status(200).send({ data: reg, fact:fact });
		} catch (error) {
			res.status(200).send({ data: undefined });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
const actualizar_documento_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Documento = conn.model('document', DocumentoSchema);
			Dpago = conn.model('dpago', DpagoSchema);
			let id = req.params['id'];
			let data = req.body;
			let admin = await Documento.findById(id);
			let pagos = await Dpago.find({ documetno: id });
			var a = 0;
			for (var p of pagos) {
				a += p.valor;
			}
			if (data.valor >= a - 0.1) {
				let reg = await Documento.updateOne(
					{ _id: id },
					{
						documento: data.documento,
						cuenta: data.cuenta,
						valor: data.valor - a,
						contenido: data.contenido,
						f_deposito: data.f_deposito,
						contenido: data.contenido,
					}
				);
				let registro = {};
				////////console.log(req.user);
				registro.admin = req.user.sub;
				registro.tipo = 'actualizo';
				registro.descripcion = JSON.stringify(admin) + JSON.stringify(data);
				await Registro.create(registro);
				res.status(200).send({ data: reg });
			} else {
				res
					.status(200)
					.send({ message: 'El número de pagos realizados con este documento es mayor al que le asignas' });
			}
		} catch (error) {
			res.status(200).send({ message: 'Algo salió mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const verificar_token = async function (req, res) {
	////////console.log(req.user);
	if (req.user) {
		res.status(200).send({ data: req.user });
	} else {
		////////console.log(2);
		res.status(500).send({ message: 'NoAccess' });
	}
};

const obtener_config_admin = async (req, res) => {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);

			Config = conn.model('config', ConfigSchema);

			let config = await Config.find().sort({ createdAt: -1 }); //await Config.findById({_id:'61abe55d2dce63583086f108'});
			if (config.length == 0) {
				res.status(200).send({ data: undefined, message: 'No se a iniciado' });
			} else {
				////console.log(config);
				res.status(200).send({ data: config });
			}
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const actualizar_config_admin = async (req, res) => {
	let fecha_actual = new Date();
	//console.log(req.body);
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			// var ConfigSchema = require('../models/Config');
			Config = conn.model('config', ConfigSchema);
			Registro = conn.model('registro', RegistroSchema);
			Pension = conn.model('pension', PensionSchema);
			Estudiante = conn.model('estudiante', EstudianteSchema);
			let data = req.body;
			////console.log(data)
			let cfg = await Config.find().sort({ createdAt: -1 });
			if (cfg.length == 0) {
				let configfecha = new Date(data.anio_lectivo);
				let mes = (fecha_actual.getFullYear() - configfecha.getFullYear()) * 12;
				mes -= configfecha.getMonth();
				mes += fecha_actual.getMonth();
				mes = mes + 1;
				////console.log(mes);
				if (mes > 10) {
					data.numpension = 10;
				} else if(mes>0){
					data.numpension = mes;
					////////console.log("638:  ",mes);
				}else{
					data.numpension=0
				}
				delete data._id;
				delete data.createdAt;
				var re = await Config.create(data);
				let vconfg = await Config.find().sort({ createdAt: -1 });
				if (vconfg.length > 0) {
					//let config = await Config.findById('61abe55d2dce63583086f108');
					let config = vconfg[0];
					let admin = vconfg[0];
					var estudiantes = await Estudiante.find();
					////////console.log('Estudiantes:', estudiantes);
					if (estudiantes.length > 0) {
						for (var i = 0; i < estudiantes.length; i++) {
							////////console.log(estudiantes[i]);
							if (estudiantes[i].estado == 'Activo' && estudiantes[i].curso <= 9) {
								var e = await Estudiante.updateOne(
									{ _id: estudiantes[i]._id },
									{
										curso: (parseInt(estudiantes[i].curso) + 1).toString(),
									}
								);
								//////console.log(e);
								var pension = {};
								pension.idanio_lectivo = config._id;
								pension.idestudiante = estudiantes[i]._id;
								pension.anio_lectivo = config.anio_lectivo;
								pension.condicion_beca = 'No';
								pension.curso = (parseInt(estudiantes[i].curso) + 1).toString();
								pension.paralelo = estudiantes[i].paralelo;
								//////console.log(pension);
								var p = await Pension.create(pension);
								//////console.log(p);
							} else if (estudiantes[i].estado == 'Activo') {
								var e = await Estudiante.updateOne(
									{ _id: estudiantes[i]._id },
									{
										estado: 'Desactivado',
									}
								);
							}
						}
					}

					let registro = {};
					////////console.log("674:  ",req.user);
					registro.admin = req.user.sub;
					registro.tipo = 'actualizo';
					registro.descripcion = JSON.stringify(admin) + JSON.stringify(data);
					await Registro.create(registro);
					res.status(200).send({ data: vconfg[0] });
				} else {
					res.status(200).send({ message: 'Algo Salio mal' });
				}
				//res.status(200).send({message:'Algo Salio mal'});
			} else {
				let configfecha = new Date(data.anio_lectivo);
				/*
                const formatDate = (current_datetime)=>{
                    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
                    return formatted_date;
                }*/

				//////console.log('Actual :',formatDate(fecha_actual),'Fecha confenviada',formatDate(configfecha),fecha_actual.getTime()>=configfecha.getTime());
			//	if (fecha_actual.getTime() >= configfecha.getTime()) {
					var aux = cfg[0]; //await Config.findById('61abe55d2dce63583086f108');
					//////console.log(aux);
					//////console.log('enviada :',formatDate(configfecha),'del sistema',formatDate(aux.anio_lectivo),configfecha.getTime()>=aux.anio_lectivo.getTime());
					if (configfecha.getTime() >= aux.anio_lectivo.getTime()) {
						let mes = (fecha_actual.getFullYear() - configfecha.getFullYear()) * 12;
						mes -= configfecha.getMonth();
						mes += fecha_actual.getMonth();
						mes = mes + 1;
						////console.log(mes);
						if (mes > 10) {
							data.numpension = 10;
						}  else if(mes>0){
							data.numpension = mes;
							////////console.log("638:  ",mes);
						}else{
							data.numpension=0
						}
						let admin = cfg[0]; //await Config.findById('61abe55d2dce63583086f108');
						//////console.log('enviada :',formatDate(configfecha),'del sistema',formatDate(admin.anio_lectivo),configfecha.getTime()>=admin.anio_lectivo.getTime());

						if (new Date(admin.anio_lectivo).getTime() != new Date(data.anio_lectivo).getTime()) {
							delete data._id;
							delete data.createdAt;
							await Config.create(data);
							/*
                            await Config.updateOne({_id:'61abe55d2dce63583086f108'},{
                                //envio_activacion : data.envio_activacion,
                                pension: data.pension,
                                matricula:data.matricula,
                                anio_lectivo:data.anio_lectivo,
                                numpension:data.numpension
                            });*/

							let vconfg = await Config.find().sort({ createdAt: -1 });
							if (vconfg.length > 0) {
								//let config = await Config.findById('61abe55d2dce63583086f108');
								let config = vconfg[0];
								var estudiantes = await Estudiante.find();
								////////console.log('Estudiantes:', estudiantes);
								if (estudiantes.length > 0) {
									for (var i = 0; i < estudiantes.length; i++) {
										////////console.log(estudiantes[i]);
										if (estudiantes[i].estado == 'Activo' && estudiantes[i].curso <= 9) {
											var e = await Estudiante.updateOne(
												{ _id: estudiantes[i]._id },
												{
													curso: (parseInt(estudiantes[i].curso) + 1).toString(),
												}
											);
											//////console.log(e);
											var pension = {};
											pension.idanio_lectivo = config._id;
											pension.idestudiante = estudiantes[i]._id;
											pension.anio_lectivo = config.anio_lectivo;
											pension.condicion_beca = 'No';
											pension.curso = (parseInt(estudiantes[i].curso) + 1).toString();
											pension.paralelo = estudiantes[i].paralelo;
											//////console.log(pension);
											var p = await Pension.create(pension);
											//////console.log(p);
										} else if (estudiantes[i].curso > 9 && estudiantes[i].estado == 'Activo') {
											var e = await Estudiante.updateOne(
												{ _id: estudiantes[i]._id },
												{
													estado: 'Desactivado',
												}
											);
										}
									}
								}

								let registro = {};
								////////console.log("674:  ",req.user);
								registro.admin = req.user.sub;
								registro.tipo = 'actualizo';
								registro.descripcion =JSON.stringify(admin) + JSON.stringify(data);

								await Registro.create(registro);
								res.status(200).send({ data: config });
							} else {
								res.status(200).send({ message: 'Algo Salio mal' });
							}
						} else {
							//console.log(data);
							let config = await Config.updateOne(
								{ _id: cfg[0]._id },
								{
									//envio_activacion : data.envio_activacion,
									mescompleto: data.mescompleto,
									pension: data.pension,
									matricula: data.matricula,
									extrapagos:data.extrapagos,
									//anio_lectivo:data.anio_lectivo,
									numpension: data.numpension,
								}
							);
							res.status(200).send({ data: config });
						}
					} else {
						res.status(200).send({ message: 'No puedes ingresar una fecha menor a la anterior' });
					}
			/*		
				} else {
					res.status(200).send({ message: 'No puedes ingresar una fecha mayor a la actual' });
				}*/
			}
		} catch (error) {
			//console.log(error);
			res.status(200).send({ message: 'Algo Salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
}; /*
{
    "_id" : ObjectId("61abe55d2dce63583086f108"),
    "anio_lectivo" : ISODate("2022-05-01T15:29:00.000Z"),
    "pension" : 42.76,
    "numpension" : 8,
    "matricula" : 26.73
}*/

const obtener_pagos_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);

			Pago = conn.model('pago', VentaSchema);
			Estudiante = conn.model('estudiante', EstudianteSchema);
			let pagos = [];
			let desde = req.params['desde'];
			let hasta = req.params['hasta'];

			pagos = await Pago.find().populate('estudiante').sort({ createdAt: -1 });

			res.status(200).send({ data: pagos });
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const obtener_detallespagos_admin = async function (req, res) {
	if (req.user) {
		try {
			var id = req.params['id'];
			//console.log(id);
			let conn = mongoose.connection.useDb(req.user.base);
			Pago = conn.model('pago', VentaSchema);
			Pension = conn.model('pension', PensionSchema);
			Estudiante = conn.model('estudiante', EstudianteSchema);
			Documento = conn.model('document', DocumentoSchema);
			Dpago = conn.model('dpago', DpagoSchema);
			let detalle = [];
			let pagosd=[];
			
			if(id!='null'){
				detalle = await Dpago.find()
				.populate('idpension')
				.populate('pago');
				detalle.forEach(element => {
					if(new Date(element.idpension.anio_lectivo).getTime()==new Date(id).getTime()){
						pagosd.push(element);
					}
				});
				res.status(200).send({ data: pagosd });
			}else{
				detalle = await Dpago.find()
				.populate('idpension');
				res.status(200).send({ data: detalle });
			}
			
			
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const obtener_detallespagos_pension_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Pago = conn.model('pago', VentaSchema);
			Pension = conn.model('pension', PensionSchema);
			Estudiante = conn.model('estudiante', EstudianteSchema);
			Documento = conn.model('document', DocumentoSchema);
			Dpago = conn.model('dpago', DpagoSchema);
			var id = req.params['id'];
			let detalle = [];
			detalle = await Dpago.find({ idpension: id })
				.populate('idpension')
				.populate('documento')
				.populate('pago')
				.populate('estudiante');

			res.status(200).send({ data: detalle });
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const obtener_detalles_ordenes_estudiante_abono = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Pension_Beca = conn.model('pension_beca', Pension_becaSchema);
			Dpago = conn.model('dpago', DpagoSchema);
			var id = req.params['id'];
			var data;
			abonos = await Dpago.find({ idpension: id }).sort({ tipo: 1 });
			becas = await Pension_Beca.find({ idpension: id }).sort({ etiqueta: 1 });
			////console.log(abonos);

			res.status(200).send({ abonos, becas });
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
const obtener_becas_conf = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Pension = conn.model('pension', PensionSchema);
			Pension_Beca = conn.model('pension_beca', Pension_becaSchema);
			Config = conn.model('config', ConfigSchema);
			
			var id = req.params['id'];

			let config=await Config.findById(id);
			//console.log(config);

			let pens=[];
			var pens2=await Pension.find();
			pens2.forEach(element => {
				if(element.idanio_lectivo==id){
					pens.push(element);
				}
				
			});
			
			var becas = await Pension_Beca.find().populate('idpension');
			
			let becasconfig=[];
			becas.forEach(element => {
				//element.idpension.idanio_lectivo==id
				if( element.idpension.idanio_lectivo==id){
					becasconfig.push(element);
				}
			});

			//console.log(becasconfig);

			res.status(200).send({ becas: becasconfig});
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
const obtener_detalles_ordenes_rubro = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Config = conn.model('config', ConfigSchema);
			Pension = conn.model('pension', Pension_becaSchema);
			Dpago = conn.model('dpago', DpagoSchema);

			var id = req.params['id'];

			pagos = await Dpago.find({ tipo: id }).populate('idpension').populate('idanio_lectivo');
			////console.log(abonos);

			res.status(200).send({ pagos });
		} catch (error) {
			console.log(error);
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
var soap = require('soap');
const { parseString, Builder } = require ('xml2js');


function toJson(xml) {
	parseString(xml, { explicitArray: false }, function(error, result) {
		//console.log(result);
		return result
		//toXML(result)
	});
}

// Convert string/JSON to XML
function toXML(json) {

	const builder = new Builder();
	//console.log(builder.buildObject(json));
	return builder.buildObject(json);
}
const marcar_finalizado_orden = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Registro = conn.model('registro', RegistroSchema);
			Pago = conn.model('pago', VentaSchema);
			var id = req.params['id'];
			let data = req.body;
			data.numeroIdPago=id;
			//console.log(data);
			let msg='';
			
			var url_validar='http://181.113.65.229:7071/WS/Facturador?wsdl';
			soap.createClient(url_validar,function(err,client){
				if(err){
					console.log("ERROR CLIENTE:",err);
				}else{
					//console.log(client);
					client.GenerarFactura(data, function(err1,result){
						if(err1){
							console.log("ERROR:", err);
						}else{
							//console.log(result);
							console.log("RESPUESTA: ",result.respuesta.respuestaGenerada);
							if(result.respuesta.respuestaGenerada=='Transaccion Exitosa'&&result.respuesta.respuestaTransaccion=='OK'){
								
								cambiar_estado(id,req.user.base,req.user.sub,data);

								msg=result.respuesta.respuestaGenerada;
							}else{
								msg=result.respuesta.respuestaGenerada;
							}
							//console.log(msg);
							res.status(200).send({ message: msg });
						}
						
					});
				}
				
			});
			
			
			

			
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
cambiar_estado = async function(id,base,admin,data){
			let conn = mongoose.connection.useDb(base);
			Registro = conn.model('registro', RegistroSchema);
			Pago = conn.model('pago', VentaSchema);
			let registro = {};
			////////console.log("674:  ",req.user);
			registro.admin = admin;
			registro.tipo = 'Emitido';
			registro.descripcion = JSON.stringify(data);
			
			await Registro.create(registro);

			var pago = await Pago.updateOne(
				{ _id: id },
				{
					estado: 'Emitido',
				}
			);
			return message='Ok'
}

const eliminar_finalizado_orden = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Registro = conn.model('registro', RegistroSchema);
			Pago = conn.model('pago', VentaSchema);
			var id = req.params['id'];

			let data = req.body;
			let registro = {};
			////////console.log("674:  ",req.user);
			registro.admin = req.user.sub;
			registro.tipo = 'Devolucion';
			registro.descripcion = JSON.stringify(data);
			await Registro.create(registro);

			var pago = await Pago.updateOne(
				{ _id: id },
				{
					estado: 'Devolucion',
				}
			);

			res.status(200).send({ data: pago });
		} catch (error) {
			res.status(200).send({ message: 'Algo salio mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const eliminar_documento_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Registro = conn.model('registro', RegistroSchema);
			Documento = conn.model('document', DocumentoSchema);
			Dpago = conn.model('dpago', DpagoSchema);
			var id = req.params['id'];

			var dpagos = await Dpago.find({ documento: id });
			if (dpagos.length == 0) {
				let doc = await Documento.findById({ _id: id });
				registro = {};
				registro.documento = id;
				registro.admin = req.user.sub;
				registro.tipo = 'Elimino';
				registro.descripcion = JSON.stringify(doc);
				await Registro.create(registro);
				//elimina documento
				await Documento.deleteOne({ _id: id });

				res.status(200).send({ message: 'Eliminado con exito' });
			} else {
				res.status(200).send({ message: 'No se puede eliminar, ya se han efectuado pagos' });
			}
			/*
            if(dpagos.length>0){
            for(var dp of dpagos){
                //actualizacion del documento al valor original
                let doc = await Documento.findById({_id:dp.documento});
                let new_stock = parseFloat(doc.valor) + parseFloat(dp.valor);
                let new_pago = doc.npagos - 1;
                await Documento.updateOne({_id: dp.documento},{
                    valor: new_stock,
                    npagos:new_pago
                });
                //registro de dpago
                let registro={};
                registro.documento=dp.documento;
                registro.admin=req.user.sub;
                registro.tipo='Elimino';
                registro.descripcion=
                ' Pago: '+dp.pago+
                ' Valor: '+dp.valor+
                ' Pension: '+dp.idpension+
                ' Estado: '+dp.estado+
                ' Tipo: '+dp.tipo+'Abono:'+dp.abono;
                await Registro.create(registro);
                //cambio del valor total del pago
                var p = await Pago.findById({_id:dp.pago});
                var np = await Pago.updateOne({_id:dp.pago},{
                  total_pagar: parseFloat(p.total_pagar - dp.valor)
                });
                var p = await Pago.findById({_id:dp.pago});
                //eliminacion en caso de ser 0
                if(p.total_pagar<=0.01){
                    var pagos = await Pago.findById(dp.pago);
                    let registro={};
                        ////////console.log(req.user);
                        registro.estudiante=pagos.estudiante;
                        registro.admin=req.user.sub;
                        registro.tipo='Elimino';
                        registro.descripcion=
                        ' Total a Pagar: '+pagos.total_pagar+
                        ' transaccion: '+pagos.transaccion+
                        ' Encargado: '+pagos.encargado.email+'-'+pagos.encargado.dni+
                        ' Estado: '+pagos.estado+
                        ' anio_lectivo: '+pagos.anio_lectivo;
                        await Registro.create(registro);
        
                    await Pago.deleteOne({_id:dp.pago});
                }
                if(dp.tipo==0){
                    //console.log(dp.estado.search('Abono'));
                     if(dp.estado.include('Abono')==-1){
                         await Pension.updateOne({_id:dp.idpension},{
                             matricula:0
                         })                        
                     }
                     
                 }else{
                     ////////console.log(dp.estado.search('Abono'));
                     if(dp.estado.search('Abono')==-1){
                         var aux = await Pension.find({_id:dp.idpension});
                         ////////console.log(aux[0]);
                         var cn= await Config.find().sort({createdAt:-1});//await Config.findById({_id:'61abe55d2dce63583086f108'});
                         let config = cn[0]; 
                         if(aux[0].condicion_beca=='Si' && dp.valor!=config.pension){
                             var dpagosbeca = await Dpago.find({idpension:dp.idpension,pago:{$ne:id} });
                             ////////console.log(dpagosbeca);
                             await Pension.updateOne({_id:dp.idpension},{
                                 meses:aux[0].meses-1,
                                 num_mes_res:aux[0].num_mes_res + 1
                             })
                         }else{
                             await Pension.updateOne({_id:dp.idpension},{
                                 meses:aux[0].meses-1
                             })
                         }
                         
                     } 
                 }
            }
            //remueve detalle de pago
            await Dpago.deleteMany({documento:id});
            }*/
			//registra documento
		} catch (error) {
			////console.log(error);
			res.status(200).send({ message: 'Algo salió mal' });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};
const eliminar_orden_admin = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Registro = conn.model('registro', RegistroSchema);
			Pago = conn.model('pago', VentaSchema);
			Config = conn.model('config', ConfigSchema);
			Pension = conn.model('pension', PensionSchema);
			Documento = conn.model('document', DocumentoSchema);
			Dpago = conn.model('dpago', DpagoSchema);
			var id = req.params['id'];
			//registra el pago
			var pagos = await Pago.findById(id);
			
			if(pagos.estado=='Registrado'){
				
				//busca los detalles de pago
				var dpagos = await Dpago.find({ pago: id });
				try {
					for (var dp of dpagos) {
						let aux = await Pension.find({ _id: dp.idpension }).populate('idanio_lectivo');
						//console.log("DP: 1664",aux);
						//actualiza el documento con el valor del pago
						let doc = await Documento.findById({ _id: dp.documento });
						let new_stock = parseFloat(doc.valor) + parseFloat(dp.valor);
						let new_pago = doc.npagos - 1;
						await Documento.updateOne(
							{ _id: dp.documento },
							{
								valor: new_stock,
								npagos: new_pago,
							}
						);
						//
						//registro de detalle de pago
						let registro = {};
						registro.estudiante = pagos.estudiante;
						registro.documento = dp.documento;
						registro.admin = req.user.sub;
						registro.tipo = 'Elimino';
						registro.descripcion = JSON.stringify(dp);
	
						await Registro.create(registro);
						if (dp.tipo == 0) {
							////////console.log(dp.estado.search('Abono'));
							if (dp.estado.search('Abono') == -1) {
								await Pension.updateOne(
									{ _id: dp.idpension },
									{
										matricula: 0,
									}
								);
							}
						} else if(dp.tipo>0&&dp.tipo<=11) {
							////////console.log(dp.estado.search('Abono'));
							if (dp.estado.search('Abono') == -1) {
								
								//console.log("1700",aux[0]);
								//var cn = await Config.find().sort({ createdAt: -1 }); //await Config.findById({_id:'61abe55d2dce63583086f108'});
								let config = aux[0].idanio_lectivo;
								//let config = await Config.findById({_id:'61abe55d2dce63583086f108'});
								if (aux[0].condicion_beca == 'Si' && dp.valor != config.pension) {
									if(aux[0].num_mes_res + 1>aux[0].num_mes_beca){
										aux[0].num_mes_res=aux[0].num_mes_beca
									}else{
										aux[0].num_mes_res=aux[0].num_mes_res+1
									}
	
									if(aux[0].meses-1<=0){
										aux[0].meses=0
									}else{
										aux[0].meses=aux[0].meses-1;
									}
	
									await Pension.updateOne(
										{ _id: dp.idpension },
										{
											meses: aux[0].meses,
											num_mes_res: aux[0].num_mes_res,
										}
									);
								} else {
									if(aux[0].meses-1<=0){
										aux[0].meses=0
									}else{
										aux[0].meses=aux[0].meses-1;
									}
									await Pension.updateOne(
										{ _id: dp.idpension },
										{
											meses: aux[0].meses,
										}
									);
								}
							}
						}else{
							try {
								if (dp.estado.search('Abono') == -1) {
									//var aux = await Pension.find({ _id: dp.idpension }).populate('idanio_lectivo');
									//console.log(aux);
									//var cn = await Config.find().sort({ createdAt: -1 }); //await Config.findById({_id:'61abe55d2dce63583086f108'});
									let config = aux[0].idanio_lectivo;
									
									//let config = await Config.findById({_id:'61abe55d2dce63583086f108'});
									var auxpagos=[];
									if(config.extrapagos){
										var auxpagos=JSON.parse(config.extrapagos);
									}
									if (auxpagos.find(element=>element.idrubro==dp.tipo)!=undefined) {
										var arr_rubro=[];
										if(aux.extrapagos){
											arr_rubro = JSON.parse(aux.extrapagos);
										}
										var rubro = arr_rubro.find(element=>element.idrubro==dp.tipo);
		
										arr_rubro.forEach((element,key) => {
											if(rubro.idrubro==element.idrubro){
												arr_rubro.splice(key,1);
											}
										});
		
										await Pension.updateOne(
											{ _id: dp.idpension },
											{
												extrapagos:JSON.stringify(arr_rubro)
											}
										);
									} 
								}
							} catch (error) {
								//console.log(error)
								res.status(200).send({ message: 'Algo salió mal'+error });
							}
							
						}
						//await Dpago.findOneAndDelete(dp._id);
					}
				} catch (error) {
					//console.log(error)
							res.status(200).send({ message: 'Algo salió mal'+error });
				}
				
				//remueve detalles de pago
				
				await Dpago.deleteMany({pago:id});
				let registro = {};
				////////console.log(req.user);
				registro.estudiante = pagos.estudiante;
				registro.admin = req.user.sub;
				registro.tipo = 'Elimino';
				registro.descripcion = JSON.stringify(pagos);
				await Registro.create(registro);
				//elimina el pago
				var pago = await Pago.deleteOne({ _id: id });

				res.status(200).send({ message: 'Eliminado con exito' });
			}else{
				res.status(200).send({ message: 'No puedes eliminar está orden, ya ah sido emitido ' });
			}
			
		} catch (error) {
			console.log(error);
			res.status(200).send({ message: 'Algo salió mal'+error });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const registro_compra_manual_estudiante = async function (req, res) {
	if (req.user) {
		try {
			let conn = mongoose.connection.useDb(req.user.base);
			Config = conn.model('config', ConfigSchema);
			Registro = conn.model('registro', RegistroSchema);
			Pago = conn.model('pago', VentaSchema);
			Pension = conn.model('pension', PensionSchema);
			Pension_Beca = conn.model('pension_beca', Pension_becaSchema);
			Documento = conn.model('document', DocumentoSchema);
			Dpago = conn.model('dpago', DpagoSchema);
			//var cn = await Config.find().sort({ createdAt: -1 }); //await Config.findById({_id:'61abe55d2dce63583086f108'});
			
			//let config = cn[0];
			//let config = await Config.findById({_id:'61abe55d2dce63583086f108'});
			var data = req.body;


			let config=data.config;
			var detalles = data.detalles;

			data.estado = 'Registrado';

			//console.log(data);
			try {
				let pago = await Pago.create(data);
				let registro = {};
				////////console.log(req.user);
				registro.admin = req.user.sub;
				registro.estudiante = data.estudiante;
				registro.tipo = 'creo';
				registro.descripcion =JSON.stringify(data);
				await Registro.create(registro);
				for (var element of detalles) {
					element.pago = pago._id;
					element.estudiante = pago.estudiante;

					if (element.tipo == 0) {
						let mat = 0;
						if (element.valor == config.matricula) {
							mat = 1;
						} else {
							var acu = 0;
							abonos = await Dpago.find({ estudiante: pago.estudiante, tipo: element.tipo });
							for (var abonoaux of abonos) {
								acu = acu + abonoaux.valor;
							}

							if (acu + element.valor == config.matricula) {
								mat = 1;
							} else {
								element.estado = element.estado;
							}
						}

						let act = await Pension.updateOne(
							{ _id: element.idpension },
							{
								matricula: mat,
							}
						);
					} else {
						if (element.tipo > 0 && element.tipo <= 10) {
							let element_meses = await Pension.findById({ _id: element.idpension });
							let mes = element_meses.meses;
							if (
								element_meses.condicion_beca == 'Si' &&
								element_meses.num_mes_res > 0 &&
								element.valor <= element_meses.val_beca
							) {
								let res_beca = element_meses.num_mes_res;
								if (element.valor == element_meses.val_beca) {
									mes = mes + 1;
									res_beca = res_beca - 1;
								} else {
									var acu = 0;
									abonos = await Dpago.find({ estudiante: pago.estudiante, tipo: element.tipo });
									for (var abonoaux of abonos) {
										acu = acu + abonoaux.valor;
									}

									if (parseFloat(acu + element.valor) == parseFloat(element_meses.val_beca)) {
										mes = mes + 1;
										res_beca = res_beca - 1;
									} else {
										element.estado = element.estado;
									}
								}
								await Pension.updateOne(
									{ _id: element.idpension },
									{
										meses: mes,
										num_mes_res: res_beca,
									}
								);
								await Pension_Beca.updateOne(
									{ idpension: element.idpension, etiqueta: element.tipo },
									{
										usado: 1,
									}
								);
							} else {
								if (element.valor == config.pension) {
									mes = mes + 1;
								} else {
									var acu = 0;
									abonos = await Dpago.find({ estudiante: pago.estudiante, tipo: element.tipo });
									for (var abonoaux of abonos) {
										acu = acu + abonoaux.valor;
									}

									if (parseFloat(acu + element.valor) == parseFloat(config.pension)) {
										mes = mes + 1;
									} else {
										element.estado = element.estado;
									}
								}

								await Pension.updateOne(
									{ _id: element.idpension },
									{
										meses: mes,
									}
								);
							}
						}else{
							let pension_config = await Pension.findById({ _id: element.idpension }).populate('idanio_lectivo');
							
							var extrapagos=JSON.parse(pension_config.idanio_lectivo.extrapagos);
							//console.log(extrapagos);
							if(!element.estado.includes('Abono')){
								var auxpago=extrapagos.find((elementpago)=>elementpago.idrubro==element.tipo);
								if(auxpago){
									//console.log(auxpago);
									var pagospen=[];
									if(pension_config.extrapagos){
										pagospen=JSON.parse(pension_config.extrapagos);
									}
									
									pagospen.push(auxpago);
									//console.log(pagospen);
									await Pension.updateOne(
										{ _id: element.idpension },
										{
											extrapagos:JSON.stringify(pagospen)
										}
									);
								}
								
							}

							
						}
						
					}
					let registro = {};
					////////console.log(req.user);
					registro.admin = req.user.sub;
					registro.estudiante = element.estudiante;
					registro.pago = element.pago;
					registro.documento = element.documento;

					registro.tipo = 'creo';
					registro.descripcion =  JSON.stringify(element);

					await Registro.create(registro);
					await Dpago.create(element);

					let element_documento = await Documento.findById({ _id: element.documento });
					let new_stock = parseFloat(element_documento.valor) - parseFloat(element.valor);
					if (new_stock <= 0.009) {
						new_stock = 0;
					}
					let new_pago = element_documento.npagos + 1;

					await Documento.updateOne(
						{ _id: element.documento },
						{
							valor: new_stock,
							npagos: new_pago,
						}
					);
				}

				//mail_confirmar_envio(pago._id);
				res.status(200).send({ pago: pago, message: 'Registrado Correctamente' });
			} catch (error) {
				console.log(error);
				res.status(200).send({ message: 'Algo salio mal'+error });
			}
		} catch (error) {
			console.log(error);
			res.status(200).send({ message: 'Algo salio mal'+error });
		}
	} else {
		res.status(500).send({ message: 'NoAccess' });
	}
};

const enviar_orden_compra = async function (pago) {
	try {
		var readHTMLFile = function (path, callback) {
			fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
				if (err) {
					throw err;
					callback(err);
				} else {
					callback(null, html);
				}
			});
		};

		var transporter = nodemailer.createTransport(
			smtpTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
				auth: {
					user: 'pagos@egbfcristorey.edu.ec',
					pass: 'nxewlthjhaqhqgqb',
				},
			})
		);

		var orden = await Pago.findById({ _id: pago }).populate('estudiante');
		var dventa = await Dventa.find({ venta: venta }).populate('producto').populate('variedad');

		readHTMLFile(process.cwd() + '/mails/email_compra.html', (err, html) => {
			let rest_html = ejs.render(html, { orden: orden, dpago: dpago });

			var template = handlebars.compile(rest_html);
			var htmlToSend = template({ op: true });

			var mailOptions = {
				from: 'pagos@egbfcristorey.edu.ec',
				to: orden.estudiante.email,
				subject: 'Confirmación de pago ' + orden._id,
				html: htmlToSend,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (!error) {
					////console.log('Email sent: ' + info.response);
				}
			});
		});
	} catch (error) {
		////console.log(error);
	}
};

const mail_confirmar_envio = async function (pago) {
	try {
		var readHTMLFile = function (path, callback) {
			fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
				if (err) {
					throw err;
					callback(err);
				} else {
					callback(null, html);
				}
			});
		};

		var transporter = nodemailer.createTransport(
			smtpTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
				auth: {
					user: 'incorp.odoo1@gmail.com',
					pass: 'vnixbyewlzmrqchw',
					//user: 'pagos@egbfcristorey.edu.ec',
					//pass: 'nxewlthjhaqhqgqb',
				},
			})
		);

		var orden = await Pago.findById({ _id: pago }).populate('estudiante');
		orden.currency = 'USD';
		//////console.log(orden);
		var dpago = await Dpago.find({ pago: pago }).populate('documento');
		// ////console.log(dpago);

		readHTMLFile(process.cwd() + '/mails/email_enviado.html', (err, html) => {
			let rest_html = ejs.render(html, { orden: orden, dpago: dpago });

			var template = handlebars.compile(rest_html);
			var htmlToSend = template({ op: true });

			var mailOptions = {
				from: 'pagos@egbfcristorey.edu.ec',
				to: orden.estudiante.email,
				subject: 'Tu pago ' + orden._id + ' fué registrado',
				html: htmlToSend,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (!error) {
					////console.log('Email sent: ' + info.response);
				}
			});
		});
	} catch (error) {
		////console.log(error);
	}
};

const enviar_email_pedido_compra = async function (pago) {
	try {
		var readHTMLFile = function (path, callback) {
			fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
				if (err) {
					throw err;
					callback(err);
				} else {
					callback(null, html);
				}
			});
		};

		var transporter = nodemailer.createTransport(
			smtpTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
				auth: {
					user: 'diegoalonssoac@gmail.com',
					pass: 'dcmplvjviofjojgf',
				},
			})
		);

		var orden = await Pago.findById({ _id: pago }).populate('estudiante');
		var dpago = await Dpago.find({ pago: pago }).populate('documento');

		readHTMLFile(process.cwd() + '/mails/email_pedido.html', (err, html) => {
			let rest_html = ejs.render(html, { orden: orden, dpago: dpago });

			var template = handlebars.compile(rest_html);
			var htmlToSend = template({ op: true });

			var mailOptions = {
				from: 'diegoalonssoac@gmail.com',
				to: orden.estudiante.email,
				subject: 'Gracias por tu orden, Prágol.',
				html: htmlToSend,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (!error) {
					////////console.log('Email sent: ' + info.response);
				}
			});
		});
	} catch (error) {
		////////console.log(error);
	}
};

const actualizar_firma_electronica = async function (req, res) {
	try {
		////console.log(req);
		var data = req.body;
		// //console.log(data);
		var fact_arr = [];
		let conn = mongoose.connection.useDb(req.user.base);
		Factura = conn.model('facturacion', FacturaSchema);
		Registro = conn.model('registro', RegistroSchema);

		fact_arr = await Factura.find();
		if (fact_arr.length == 0 ) {
			bcrypt.hash(data.password_firma, null, null, async function (err, hash) {
				if (hash) {
					data.password_firma = hash;
					var img_path = req.files.portada.path;
					var name = img_path.split('/');
					var portada_name = name[2];
					data.archivo_firma = portada_name;

					var reg = await Factura.create(data);
					data.idadmin = req.user.sub;

					let registro = {};
					registro.admin = req.user.sub;
					registro.tipo = 'Registro';
					registro.descripcion = JSON.stringify(data);

					await Registro.create(registro);

					res.status(200).send({ message: 'Registrado con exito' });
				} else {
					res.status(200).send({ message: 'ErrorServer comuniquese con el administrador' });
				}
			});
		} else {
			bcrypt.hash(data.password_firma, null, null, async function (err, hash) {
				if (hash) {
					data.password_firma = hash;
					var img_path = req.files.portada.path;
					var name = img_path.split('/');
					var portada_name = name[2];
					data.archivo_firma = portada_name;

					var reg = await Factura.create(data);

					await Factura.updateOne(
						{ _id: fact_arr[0]._id },
						{
							password_firma:data.password_firma,
							archivo_firma:data.archivo_firma
						}
					);

					data.idadmin = req.user.sub;

					let registro = {};
					registro.admin = req.user.sub;
					registro.tipo = 'Actualizo';
					registro.descripcion = JSON.stringify(data);

					await Registro.create(registro);

					res.status(200).send({ message: 'Actualizado con exito' });
				} else {
					res.status(200).send({ message: 'ErrorServer comuniquese con el administrador' });
				}
			});
		}
	} catch (error) {
		res.status(200).send({ message: 'Algo salio mal' });
	}
};

module.exports = {
	cambiar_base,
	actualizar_admininstitucion,
	listar_admininstitucion,
	obtener_portada,
	newpassword,
	forgotpassword,
	registrar_admin,
	eliminar_finalizado_orden,
	login_admin,
	registro_documento_admin,
	listar_documentos_admin,
	obtener_documento_admin,
	actualizar_documento_admin,
	verificar_token,
	obtener_config_admin,
	actualizar_config_admin,
	obtener_pagos_admin,
	obtener_detalles_ordenes_estudiante_abono,
	obtener_becas_conf,
	marcar_finalizado_orden,
	eliminar_orden_admin,
	registro_compra_manual_estudiante,
	registro_admin,
	listar_admin,
	actualizar_admin,
	obtener_admin,
	eliminar_admin,
	eliminar_documento_admin,
	eliminar_estudiante_admin,
	reactivar_estudiante_admin,
	obtener_detallespagos_admin,
	obtener_detallespagos_pension_admin,
	listar_registro,
	obtener_detalles_ordenes_rubro,
	actualizar_firma_electronica,
	getDashboar_estudiante,
	actualizzas_dash
};
