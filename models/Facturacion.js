'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacturacionSchema = Schema({
    password_firma: {type: String, required: true},
    archivo_firma: {type: String, required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

//module.exports =  mongoose.model('instituto',InstitucionSchema);
module.exports=FacturacionSchema;