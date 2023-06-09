var fs = require('fs');
const builder = require('xmlbuilder');



const estructuraFactura = {
    factura:{
        //_id:"comprobante",
       // _version:"1.0.0",
        infoTributaria:{
            ambiente:null,
            tipoEmision:null,
            razonSocial:null,
            nombreComercial:null,
            ruc:null,
            claveAcceso:null,
            codDoc:null,
            estab:null,
            ptoEmi:null,
            secuencial:null,
            dirMatriz:null,
        },
        infoFactura:{
            fechaEmision:null,
            dirEstablecimiento:null,
            contribuyenteEspecial:null,
            obligadoContabilidad:null,
            tipoIdentificacionComprador:null,
            guiaRemision:null,
            razonSocialComprador:null,
            identificacionComprador:null,
            direccionComprador:null,
            totalSinImpuestos:null,
            totalDescuento:null,
            totalConImpuestos:{
                totalImpuesto:[
                {
                    codigo:2,
                    codigoPorcentaje:2,
                    //descuentoAdicional:null,
                    baseImponible:null,
                    valor:null,
                },
                {
                    codigo:3,
                    codigoPorcentaje:3072,
                    baseImponible:null,
                    valor:null,
                },
                {
                    codigo:5,
                    codigoPorcentaje:5001,
                    baseImponible:null,
                    valor:null,
                }
                ]
            },
            propina:null,
            importeTotal:null,
            moneda:null,
        },
        detalles:{
            detalle:[
            {
                codigoPrincipal:null, //opcional
                codigoAuxiliar:null, //obliatorio cuando corresponda
                descripcion:null,
                cantidad:null,
                precioUnitario:null,
                descuento:null,
                precioTotalSinImpuesto:null,
                detallesAdicionales:{
                    detAdicional:[
                        {
                            _nombre:"",
                            _valor:""
                        }
                        //<detAdicional nombre="Marca Chevrolet" valor="Chevrolet"/>
                    ]
                },
                    
                impuestos:{
                    impuesto:[
                    {
                        codigo:2,
                        codigoPorcentaje:2,
                        tarifa:12,
                        baseImponible:null,
                        valor:null
                    },
                    {
                        codigo:3,
                        codigoPorcentaje:3072,
                        tarifa:5,
                        baseImponible:null,
                        valor:null
                    },
                    {
                        codigo:5,
                        codigoPorcentaje:5001,
                        tarifa:0.02,
                        baseImponible:null,
                        valor:null
                    }
                    ]
                }
            }
            ]
        },
        infoAdicional:{
            campoAdicional:[
            {
                _nombre:"Codigo Impuesto ISD",
                __text:4580
            },
            {
                _nombre:"Impuesto ISD",
                __text:"15.42x"
            }
                //<campoAdicional nombre="Codigo Impuesto ISD">4580</campoAdicional> //Obligatorio cuando corresponda
                //<campoAdicional nombre="Impuesto ISD">15.42x</campoAdicional> //Obligatorio cuando corresponda
            ]
        }
    }
 
};
const factura2={
    "factura": {
        //"-xmlns:ds": "http://www.w3.org/2000/09/xmldsig#",
        //"-xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
       // "-xsi:noNamespaceSchemaLocation": "file:/C:/borrar/xsd/111-xsd-1_V2.1.0.xsd",
        id: "comprobante",
        version: "version0",
        infoTributaria: {
            ambiente: "1",
            tipoEmision: "1",
            razonSocial: "PRUEBAS SERVICIO DE RENTAS INTERNAS",
            nombreComercial: "nombreComercial0",
            ruc: "0000000000001",
            claveAcceso: "0000000000000000000000000000000000000000000000000",
            codDoc: "00",
            estab: "000",
            ptoEmi: "000",
            secuencial: "000000000",
            dirMatriz: "dirMatriz0",
            agenteRetencion: "0",
            contribuyenteRimpe: "CONTRIBUYENTE RÉGIMEN RIMPE"
        },
        infoFactura: {
            fechaEmision: "01/01/2000",
            dirEstablecimiento: "dirEstablecimiento0",
            contribuyenteEspecial: "contribuyente",
            obligadoContabilidad: "SI",
            comercioExterior: "EXPORTADOR",
            incoTermFactura: "A",
            lugarIncoTerm: "lugarIncoTerm0",
            paisOrigen: "000",
            puertoEmbarque: "puertoEmbarque0",
            puertoDestino: "puertoDestino0",
            paisDestino: "000",
            paisAdquisicion: "000",
            tipoIdentificacionComprador: "04",
            guiaRemision: "000-000-000000000",
            razonSocialComprador: "razonSocialComprador0",
            identificacionComprador: "identificacionCompra",
            direccionComprador: "direccionComprador0",
            totalSinImpuestos: "50.00",
            totalSubsidio: "50.00",
            incoTermTotalSinImpuestos: "A",
            totalDescuento: "0.00",
            codDocReembolso: "00",
            totalComprobantesReembolso: "50.00",
            totalBaseImponibleReembolso: "50.00",
            totalImpuestoReembolso: "50.00",
            totalConImpuestos: {
                   totalImpuesto: [
                    {
                        codigo: "2",
                        codigoPorcentaje: "0",
                        descuentoAdicional: "0.00",
                        baseImponible: "50.00",
                        tarifa: "49.50",
                        valor: "50.00",
                        valorDevolucionIva: "50.00"
                    },
                    {
                        codigo: "2",
                        codigoPorcentaje: "0",
                        descuentoAdicional: "0.00",
                        baseImponible: "50.00",
                        tarifa: "49.50",
                        valor: "50.00",
                        valorDevolucionIva: "50.00"
                    }
                ]
            },
            compensaciones: {
                compensacion: [
                    {
                        codigo: "1",
                        tarifa: "49.50",
                        valor: "50.00"
                    },
                    {
                        codigo: "1",
                        tarifa: "49.50",
                        valor: "50.00"
                    }
                ]
            },
            propina: "50.00",
            fleteInternacional: "50.00",
            seguroInternacional: "50.00",
            gastosAduaneros: "50.00",
            gastosTransporteOtros: "50.00",
            importeTotal: "50.00",
            moneda: "moneda0",
            placa: "placa0",
            pagos: {
                pago: [
                    {
                        formaPago: "01",
                        total: "50.00",
                        plazo: "50.00",
                        unidadTiempo: "unidadTiem"
                    },
                    {
                        formaPago: "01",
                        total: "50.00",
                        plazo: "50.00",
                        unidadTiempo: "unidadTiem"
                    }
                ]
            },
            valorRetIva: "50.00",
            valorRetRenta: "50.00"
        },
        detalles: {
            detalle: [
                {
                    codigoPrincipal: "codigoPrincipal0",
                    codigoAuxiliar: "codigoAuxiliar0",
                    descripcion: "descripcion0",
                    unidadMedida: "unidadMedida0",
                    cantidad: "50.000000",
                    precioUnitario: "50.000000",
                    precioSinSubsidio: "50.000000",
                    descuento: "50.00",
                    precioTotalSinImpuesto: "50.00",
                    detallesAdicionales: {
                        detAdicional: [
                            {
                                nombre: "nombre0",
                                valor: "valor0"
                            },
                            {
                                nombre: "nombre1",
                                valor: "valor1"
                            }
                        ]
                    },
                    impuestos: {
                        impuesto: [
                            {
                                codigo: "2",
                                codigoPorcentaje: "0",
                                tarifa: "49.50",
                                baseImponible: "50.00",
                                valor: "50.00"
                            },
                            {
                                codigo: "2",
                                codigoPorcentaje: "0",
                                tarifa: "49.50",
                                baseImponible: "50.00",
                                valor: "50.00"
                            }
                        ]
                    }
                },
                {
                    codigoPrincipal: "codigoPrincipal1",
                    codigoAuxiliar: "codigoAuxiliar1",
                    descripcion: "descripcion1",
                    unidadMedida: "unidadMedida1",
                    cantidad: "50.000000",
                    precioUnitario: "50.000000",
                    precioSinSubsidio: "50.000000",
                    descuento: "50.00",
                    precioTotalSinImpuesto: "50.00",
                    detallesAdicionales: {
                        detAdicional: [
                            {
                                nombre: "nombre2",
                                valor: "valor2"
                            },
                            {
                                nombre: "nombre3",
                                valor: "valor3"
                            }
                        ]
                    },
                    impuestos: {
                        impuesto: [
                            {
                                codigo: "2",
                                codigoPorcentaje: "0",
                                tarifa: "49.50",
                                baseImponible: "50.00",
                                valor: "50.00"
                            },
                            {
                                codigo: "2",
                                codigoPorcentaje: "0",
                                tarifa: "49.50",
                                baseImponible: "50.00",
                                valor: "50.00"
                            }
                        ]
                    }
                }
            ]
        },
        reembolsos: {
            reembolsoDetalle: [
                {
                    tipoIdentificacionProveedorReembolso: "04",
                    identificacionProveedorReembolso: "identificacionProvee",
                    codPaisPagoProveedorReembolso: "000",
                    tipoProveedorReembolso: "01",
                    codDocReembolso: "00",
                    estabDocReembolso: "000",
                    ptoEmiDocReembolso: "000",
                    secuencialDocReembolso: "000000000",
                    fechaEmisionDocReembolso: "01/01/2000",
                    numeroautorizacionDocReemb: "0000000000",
                    detalleImpuestos: {
                        detalleImpuesto: [
                            {
                                codigo: "2",
                                codigoPorcentaje: "0",
                                tarifa: "49.50",
                                baseImponibleReembolso: "50.00",
                                impuestoReembolso: "50.00"
                            },
                            {
                                codigo: "2",
                                codigoPorcentaje: "0",
                                tarifa: "49.50",
                                baseImponibleReembolso: "50.00",
                                impuestoReembolso: "50.00"
                            }
                        ]
                    },
                    compensacionesReembolso: {
                        compensacionReembolso: [
                            {
                                codigo: "1",
                                tarifa: "49.50",
                                valor: "50.00"
                            },
                            {
                                codigo: "1",
                                tarifa: "49.50",
                                valor: "50.00"
                            }
                        ]
                    }
                },
                {
                    tipoIdentificacionProveedorReembolso: "04",
                    identificacionProveedorReembolso: "identificacionProvee",
                    codPaisPagoProveedorReembolso: "000",
                    tipoProveedorReembolso: "01",
                    codDocReembolso: "00",
                    estabDocReembolso: "000",
                    ptoEmiDocReembolso: "000",
                    secuencialDocReembolso: "000000000",
                    fechaEmisionDocReembolso: "01/01/2000",
                    numeroautorizacionDocReemb: "0000000000",
                    detalleImpuestos: {
                        detalleImpuesto: [
                            {
                                codigo: "2",
                                codigoPorcentaje: "0",
                                tarifa: "49.50",
                                baseImponibleReembolso: "50.00",
                                impuestoReembolso: "50.00"
                            },
                            {
                                codigo: "2",
                                codigoPorcentaje: "0",
                                tarifa: "49.50",
                                baseImponibleReembolso: "50.00",
                                impuestoReembolso: "50.00"
                            }
                        ]
                    },
                    compensacionesReembolso: {
                        compensacionReembolso: [
                            {
                                codigo: "1",
                                tarifa: "49.50",
                                valor: "50.00"
                            },
                            {
                                codigo: "1",
                                tarifa: "49.50",
                                valor: "50.00"
                            }
                        ]
                    }
                }
            ]
        },
        retenciones: {
            retencion: [
                {
                    codigo: "4",
                    codigoPorcentaje: "0",
                    tarifa: "499.50",
                    valor: "50.00"
                },
                {
                    codigo: "4",
                    codigoPorcentaje: "0",
                    tarifa: "499.50",
                    valor: "50.00"
                }
            ]
        },
        infoSustitutivaGuiaRemision: {
            dirPartida: "dirPartida0",
            dirDestinatario: "dirDestinatario0",
            fechaIniTransporte: "01/01/2000",
            fechaFinTransporte: "01/01/2000",
            razonSocialTransportista: "razonSocialTransportista0",
            tipoIdentificacionTransportista: "04",
            rucTransportista: "rucTransportista0",
            placa: "placa1",
            destinos: {
                destino: [
                    {
                        motivoTraslado: "motivoTraslado0",
                        docAduaneroUnico: "docAduaneroUnico0",
                        codEstabDestino: "000",
                        ruta: "ruta0"
                    },
                    {
                        motivoTraslado: "motivoTraslado1",
                        docAduaneroUnico: "docAduaneroUnico1",
                        codEstabDestino: "000",
                        ruta: "ruta1"
                    }
                ]
            }
        },
        otrosRubrosTerceros: {
            rubro: [
                {
                    concepto: "concepto0",
                    total: "50.00"
                },
                {
                    concepto: "concepto1",
                    total: "50.00"
                }
            ]
        },
        tipoNegociable: {
            correo: "correo0"
        },
        maquinaFiscal: {
            marca: "marca0",
            modelo: "modelo0",
            serie: "serie0"
        },
        infoAdicional: {
            campoAdicional: [
                {
                    nombre: "nombre4",
                    text: "campoAdicional0"
                },
                {
                    nombre: "nombre5",
                    text: "campoAdicional1"
                }
            ]
        }
    }
}

let xml;
const { parseString, Builder } = require ('xml2js');
function p_generar_factura_xml(){
   // console.log("3");
    
    var tipoComprobante = 'factura';
    var estab = 1;
    var ptoEmi = 1;

    estructuraFactura[tipoComprobante].infoTributaria.ambiente = 1; //1 pruebas, 2 produccion
    estructuraFactura[tipoComprobante].infoTributaria.tipoEmision = 1; //1 emision normal
    estructuraFactura[tipoComprobante].infoTributaria.razonSocial = 'JYBARO SOFTWARE HOUSE CIA LTDA';
    estructuraFactura[tipoComprobante].infoTributaria.nombreComercial = 'JYBARO SOFTWARE HOUSE CIA LTDA';
    estructuraFactura[tipoComprobante].infoTributaria.ruc = '1792521254001';
    estructuraFactura[tipoComprobante].infoTributaria.claveAcceso = ''; //se lo llena más abajo
    estructuraFactura[tipoComprobante].infoTributaria.codDoc ='1'; //tipo de comprobante
    estructuraFactura[tipoComprobante].infoTributaria.estab = '2';
    estructuraFactura[tipoComprobante].infoTributaria.ptoEmi = '3';
    estructuraFactura[tipoComprobante].infoTributaria.secuencial = '3';
    estructuraFactura[tipoComprobante].infoTributaria.dirMatriz = 'Carapungo Av. Luis Vacarri B9 S29 y Carihuairazo';
    
    
    estructuraFactura[tipoComprobante].infoFactura.fechaEmision ='1/2/2023';
    estructuraFactura[tipoComprobante].infoFactura.dirEstablecimiento = 'Carapungo B9-S29';
    estructuraFactura[tipoComprobante].infoFactura.contribuyenteEspecial = '5368';
    estructuraFactura[tipoComprobante].infoFactura.obligadoContabilidad = 'SI';
    estructuraFactura[tipoComprobante].infoFactura.tipoIdentificacionComprador = '3';
    estructuraFactura[tipoComprobante].infoFactura.guiaRemision = '001-001-000000001';
    estructuraFactura[tipoComprobante].infoFactura.razonSocialComprador = 'PRUEBAS SERVICIO DE RENTAS INTERNAS';
    estructuraFactura[tipoComprobante].infoFactura.identificacionComprador = '1713328506001';
    estructuraFactura[tipoComprobante].infoFactura.direccionComprador = 'salinas y santiago';
    estructuraFactura[tipoComprobante].infoFactura.totalSinImpuestos = '2995000.00';
    estructuraFactura[tipoComprobante].infoFactura.totalDescuento = '5000.00';
        

    estructuraFactura[tipoComprobante].infoFactura.totalConImpuestos.totalImpuesto[0].baseImponible = '309750.00';
    estructuraFactura[tipoComprobante].infoFactura.totalConImpuestos.totalImpuesto[0].valor = '37170.00';

    estructuraFactura[tipoComprobante].infoFactura.totalConImpuestos.totalImpuesto[1].baseImponible = '295000.00';
    estructuraFactura[tipoComprobante].infoFactura.totalConImpuestos.totalImpuesto[1].valor = '14750.00';
    
    estructuraFactura[tipoComprobante].infoFactura.totalConImpuestos.totalImpuesto[2].baseImponible = '12000.00';
    estructuraFactura[tipoComprobante].infoFactura.totalConImpuestos.totalImpuesto[2].valor = '240.00';
    
    estructuraFactura[tipoComprobante].infoFactura.propina = '0.00';
    estructuraFactura[tipoComprobante].infoFactura.importeTotal = '3371160.00';
    estructuraFactura[tipoComprobante].infoFactura.moneda = 'DOLAR';    
   
    estructuraFactura[tipoComprobante].infoTributaria.claveAcceso = p_obtener_codigo_autorizacion_desde_comprobante(estructuraFactura);
    //console.log("4");
    
    estructuraFactura[tipoComprobante].detalles.detalle[0].codigoPrincipal = '125BJC-01';
    estructuraFactura[tipoComprobante].detalles.detalle[0].codigoAuxiliar = '1234D56789-A';
    estructuraFactura[tipoComprobante].detalles.detalle[0].descripcion = 'CAMIONETA 4X4 DIESEL 3.7';
    estructuraFactura[tipoComprobante].detalles.detalle[0].cantidad = '10.00';
    estructuraFactura[tipoComprobante].detalles.detalle[0].precioUnitario = '300000.00';
    estructuraFactura[tipoComprobante].detalles.detalle[0].descuento = '5000.00';
    estructuraFactura[tipoComprobante].detalles.detalle[0].precioTotalSinImpuesto = '295000.00';
    
    estructuraFactura[tipoComprobante].detalles.detalle[0].detallesAdicionales.detAdicional[0]._nombre = 'Marca Chevrolet';
    estructuraFactura[tipoComprobante].detalles.detalle[0].detallesAdicionales.detAdicional[0]._valor = 'Chevrolet';
    
   
    estructuraFactura[tipoComprobante].detalles.detalle[0].impuestos.impuesto[0].baseImponible = '309750.00';
    estructuraFactura[tipoComprobante].detalles.detalle[0].impuestos.impuesto[0].valor = '361170.00';
    
    estructuraFactura[tipoComprobante].detalles.detalle[0].impuestos.impuesto[1].baseImponible = '295000.00';
    estructuraFactura[tipoComprobante].detalles.detalle[0].impuestos.impuesto[1].valor = '14750.00';
    

    estructuraFactura[tipoComprobante].detalles.detalle[0].impuestos.impuesto[2].baseImponible = '12000.00';
    estructuraFactura[tipoComprobante].detalles.detalle[0].impuestos.impuesto[2].valor = '240.00';
    
    
    //var x2js = new X2JS({useDoubleQuotes:true});
    
    var xmlAsStr = '<?xml version="1.0" encoding="UTF-8"?>\n';
    //console.log({xmlresult:xmlAsStr,clave:estructuraFactura[tipoComprobante].infoTributaria.claveAcceso});

    //xmlAsStr += x2js.json2xml_str(estructuraFactura);


      let xmlString=builder.create(tipoComprobante,{version:"1.0",encoding:"UTF-8",standalone: true});
      xmlString.att('xmlns', 'http://example.com')
      .att('id',"comprobante").att('version',"1.0.0");

      xmlString.dtd('html',
        `<!ELEMENT html (head, body)>
        <!ELEMENT head (title)>
        <!ELEMENT title (#PCDATA)>
        <!ELEMENT body (#PCDATA)>`
        )
        .ele('head').ele('title').text('Document Title')
        .ele('body').text('Document content');

        xmlString.ele(estructuraFactura[tipoComprobante])
      .end({ pretty: true});
      const builder2 = new Builder();
      console.log("FACTURA:",builder2.buildObject(estructuraFactura[tipoComprobante]));
      /*
      let xmlString2=builder.create(factura2[tipoComprobante],{version:"1.0",encoding:"UTF-8",standalone: true})
      .end({ pretty: true});

      console.log("NUEVO:",xmlString2.toString());*/
    return {xmlresult:xmlString,clave:estructuraFactura[tipoComprobante].infoTributaria.claveAcceso};
}
function isObjet(xml,element){
    //console.log("229: ",element);
    try {
        for (const key2 in element) {
            //console.log("226: ",Object.hasOwnProperty.call(element, key2),element);
            if (Object.hasOwnProperty.call(element, key2)) {
                const element2 = element[key2];
               // console.log("229: ",typeof element2 === 'object' && element2 !== null,element2);
                
                    //console.log("231: ",Array.isArray(element2),element2);
                    if(Array.isArray(element2)){
                        element2.forEach((element3) => {
                            isObjet(xml,element3);
                        });
                        }else if (typeof element2 === 'object' && element2 !== null) {
                            isObjet(xml,element2);
                            //console.log(element2);  
                        }else{
                           // console.log("Ingreso:",key2,element[key2] );
                            xml.ele(key2,element[key2])//.text()
                           
                        }
                   
                    
                  
               
            }else{
                console.log("error");
            }
    
        }
        //console.log(xml);
        
    } catch (error) {
        console.log(error);
    }
}

function p_obtener_codigo_autorizacion_desde_comprobante(comprobante) {
   // console.log('5');
    var tipoComprobante = Object.keys(comprobante)[0];
    //console.log('5', tipoComprobante);
    var codigoAutorizacion = p_obtener_codigo_autorizacion(
        new Date(), //fechaEmision
        tipoComprobante,//tipoComprobante
        comprobante[tipoComprobante].infoTributaria.ruc,//ruc
        comprobante[tipoComprobante].infoTributaria.ambiente,//ambiente
        comprobante[tipoComprobante].infoTributaria.estab,//estab
        comprobante[tipoComprobante].infoTributaria.ptoEmi,//ptoEmi
        comprobante[tipoComprobante].infoTributaria.secuencial,//secuencial
        null,//codigo
        comprobante[tipoComprobante].infoTributaria.tipoEmision//tipoEmision
        );
    //console.log("10",codigoAutorizacion);
    return codigoAutorizacion;
}
function p_obtener_codigo_autorizacion(fechaEmision, tipoComprobante, ruc, ambiente, estab, ptoEmi, secuencial, codigo, tipoEmision) {
    //console.log('6');
    fechaEmision = fechaEmision || new Date();
    tipoComprobante = tipoComprobante || 'factura'; //1 factura, 4 nota de crédito, 5 nota de débito, 6 guía de remisión, 7 retención
    ruc = ruc || '9999999999999';
    ambiente = ambiente || 1; // 1 pruebas, 2 produccion
    
    //serie = serie || 0;
    estab = estab || 1;
    ptoEmi = ptoEmi || 1;
    
   
    secuencial = secuencial // || p_obtener_secuencial(tipoComprobante);
    codigo = codigo||0 //||  (new date(fechaEmision).format('DDMM') + pad(secuencial, 4).slice(-3) + p_calcular_digito_modulo11(moment(fechaEmision).format('DDMM') + pad(secuencial, 3).slice(-3)));
    tipoEmision = tipoEmision ||  1; //1 emision normal

    var codigo_autorizacion = new Date(fechaEmision).getDate().toString()+new Date(fechaEmision).getMonth().toString()+new Date(fechaEmision).getFullYear().toString() + pad(estructuraFactura[tipoComprobante].infoTributaria.codDoc, 2) + pad(ruc, 13) + pad(ambiente, 1)  + pad(estab, 3) + pad(ptoEmi, 3) + pad(secuencial, 9)+ pad(codigo, 8)+ pad(tipoEmision, 1);
  
    var digito_calculado = p_calcular_digito_modulo11(codigo_autorizacion);
    
    if (digito_calculado > -1) {
        //console.log(digito_calculado > -1,codigo_autorizacion + digito_calculado);
        return (codigo_autorizacion + digito_calculado);
    }
}
function pad(n, width, z) {
    
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function p_calcular_digito_modulo11(numero) {
    var digito_calculado = -1;
    
    if (typeof(numero) == 'string' && /^\d+$/.test(numero)) {
        
        var digitos = numero.split('').map(Number); //arreglo con los dígitos del número

        digito_calculado = 11 - digitos.reduce(function(valorPrevio, valorActual, indice) {
            return valorPrevio + (valorActual * (7 - indice % 6));
        }, 0) % 11;
        
        digito_calculado = (digito_calculado == 11) ? 0 : digito_calculado; //según ficha técnica
        digito_calculado = (digito_calculado == 10) ? 1 : digito_calculado; //según ficha técnica
    }
    //console.log(digito_calculado);
    return digito_calculado;
}







const table={
    tabla1:[
        {
            "No.": "1",
            "Descripción de campo": "Fecha de emisión",
            "Tipo de campo": "Numérico",
            "Formato": "ddmmaaaa",
            "Longitud": "8",
            "Requisito": "Obligatorio",
            "Etiqueta o tag en archivo XML": "<claveAcceso>"
        },
        {
            "No.": "2",
            "Descripción de campo": "Tipo de comprobante",
            "Tipo de campo": "Numérico",
            "Formato": "Tabla 3",
            "Longitud": "2",
            "Requisito": "Obligatorio",
            "Etiqueta o tag en archivo XML": "<claveAcceso>"
        },
        {
            "No.": "3",
            "Descripción de campo": "Número de RUC",
            "Tipo de campo": "Numérico",
            "Formato": "1234567890001",
            "Longitud": "13",
            "Requisito": "Obligatorio",
            "Etiqueta o tag en archivo XML": "<claveAcceso>"
        },
        {
            "No.": "4",
            "Descripción de campo": "Tipo de ambiente",
            "Tipo de campo": "Numérico",
            "Formato": "Tabla 4",
            "Longitud": "1",
            "Requisito": "Obligatorio",
            "Etiqueta o tag en archivo XML": "<claveAcceso>"
        },
        {
            "No.": "5",
            "Descripción de campo": "Serie",
            "Tipo de campo": "Numérico",
            "Formato": "1001",
            "Longitud": "6",
            "Requisito": "Obligatorio",
            "Etiqueta o tag en archivo XML": "<claveAcceso>"
        },
        {
            "No.": "6",
            "Descripción de campo": "Número del comprobante (secuencial)",
            "Tipo de campo": "Numérico",
            "Formato": "1",
            "Longitud": "9",
            "Requisito": "Obligatorio",
            "Etiqueta o tag en archivo XML": "<claveAcceso>"
        },
        {
            "No.": "7",
            "Descripción de campo": "Código numérico",
            "Tipo de campo": "Numérico",
            "Formato": "Numérico",
            "Longitud": "8",
            "Requisito": "Obligatorio",
            "Etiqueta o tag en archivo XML": "<claveAcceso>"
        },
        {
            "No.": "8",
            "Descripción de campo": "Tipo de emisión",
            "Tipo de campo": "Numérico",
            "Formato": "Tabla 2",
            "Longitud": "1",
            "Requisito": "Obligatorio",
            "Etiqueta o tag en archivo XML": "<claveAcceso>"
        },
        {
            "No.": "9",
            "Descripción de campo": "Dígito verificador (módulo 11)",
            "Tipo de campo": "Numérico",
            "Formato": "Numérico",
            "Longitud": "1",
            "Requisito": "Obligatorio",
            "Etiqueta o tag en archivo XML": "<claveAcceso>"
        }
    ],
    tabla2:[
        {
            "No.": "1",
            "Tipo de emisión": "Emisión normal",
            "Código": "1",
            "Requisito": "Obligatorio"
        }
    ],
    tabla3:[
        {
            "No.": "1",
            "Nombre comprobante": "FACTURA",
            "Código": "1",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag en archivo XML\"": "<codDoc>"
        },
        {
            "No.": "2",
            "Nombre comprobante": "LIQUIDACIÓN DE COMPRA DE BIENES Y PRESTACIÓN DE SERVICIOS",
            "Código": "3",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag en archivo XML\"": "<codDoc>"
        },
        {
            "No.": "3",
            "Nombre comprobante": "NOTA DE CRÉDITO",
            "Código": "4",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag en archivo XML\"": "<codDoc>"
        },
        {
            "No.": "4",
            "Nombre comprobante": "NOTA DE DÉBITO",
            "Código": "5",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag en archivo XML\"": "<codDoc>"
        },
        {
            "No.": "5",
            "Nombre comprobante": "GUÍA DE REMISIÓN",
            "Código": "6",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag en archivo XML\"": "<codDoc>"
        },
        {
            "No.": "6",
            "Nombre comprobante": "COMPROBANTE DE RETENCIÓN",
            "Código": "7",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag en archivo XML\"": "<codDoc>"
        }
    ],
    tabla4:[
        {
            "No.": "1",
            "Tipo de ambiente": "Pruebas",
            "Código": "1",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "2",
            "Tipo de ambiente": "Producción",
            "Código": "2",
            "Requisito": "Obligatorio"
        }
    ],
    table5:[
        {
            "No.": "1",
            "Identificación Receptor": "RUC",
            "Número": "xxxxxxxxxx001",
            "Razón Social": "\"PRUEBAS SERVICIO DE RENTAS INTERNAS\""
        },
        {
            "No.": "2",
            "Identificación Receptor": "Cédula de identidad",
            "Número": "xxxxxxxxxx",
            "Razón Social": "\"PRUEBAS SERVICIO DE RENTAS INTERNAS\""
        },
        {
            "No.": "3",
            "Identificación Receptor": "Pasaporte",
            "Número": "xxxxxxxxxxxxx",
            "Razón Social": "\"PRUEBAS SERVICIO DE RENTAS INTERNAS\""
        }
    ],
    table6:[
        {
            "No.": "1",
            "Tipo de identificación": "RUC",
            "Código": "4",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "2",
            "Tipo de identificación": "CÉDULA",
            "Código": "5",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "3",
            "Tipo de identificación": "PASAPORTE",
            "Código": "6",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "4",
            "Tipo de identificación": "VENTA A CONSUMIDOR FINAL*",
            "Código": "7",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "5",
            "Tipo de identificación": "IDENTIFICACIÓN DELEXTERIOR*",
            "Código": "8",
            "Requisito": "Obligatorio"
        }
    ],
    table61:[
        {
            "No.": "1",
            "Estado del comprobante electrónico": "En procesamiento",
            "SIGLAS": "PPR"
        },
        {
            "No.": "2",
            "Estado del comprobante electrónico": "Autorizado",
            "SIGLAS": "AUT"
        },
        {
            "No.": "3",
            "Estado del comprobante electrónico": "No autorizado",
            "SIGLAS": "NAT"
        }
    ],
    table62:[
        {
            "Descripción": "Estándar de firma",
            "Especificación": "XadES_BES",
            "Documentación técnica relacionada": "http://uri.etsi.org/01903/v1.3.2/ts_101903v010302p.pdf"
        },
        {
            "Descripción": "Versión del esquema",
            "Especificación": "1.3.2",
            "Documentación técnica relacionada": "http://uri.etsi.org/01903/v1.3.2#"
        },
        {
            "Descripción": "Codificación",
            "Especificación": "UTF-8",
            "Documentación técnica relacionada": ""
        },
        {
            "Descripción": "Tipo de firma",
            "Especificación": "ENVELOPED",
            "Documentación técnica relacionada": "http://www.w3.org/2000/09/xmldsig#enveloped-signature"
        }
    ],
    table8:[
        {
            "ETIQUETAS O TAGS": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        },
        {
            "ETIQUETAS O TAGS": "- <lote version=\"1.0.0\">",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        },
        {
            "ETIQUETAS O TAGS": "\"<claveAcceso>2808201400179210439400110010010000000091234567812</claveAcceso>\"",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "Numérico",
            "LONGITUD / FORMATO": "49"
        },
        {
            "ETIQUETAS O TAGS": "-<ruc>1792104394001</ruc>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "Numérico",
            "LONGITUD / FORMATO": "13"
        },
        {
            "ETIQUETAS O TAGS": "-<comprobantes>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        },
        {
            "ETIQUETAS O TAGS": "-<comprobante>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        },
        {
            "ETIQUETAS O TAGS": "<![CDATA[COMPROBANTE]]>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        },
        {
            "ETIQUETAS O TAGS": "-</comprobante>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        },
        {
            "ETIQUETAS O TAGS": "-<comprobante>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        },
        {
            "ETIQUETAS O TAGS": "<![CDATA[COMPROBANTE]]>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        },
        {
            "ETIQUETAS O TAGS": "-</comprobante>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        },
        {
            "ETIQUETAS O TAGS": "-</comprobantes>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        },
        {
            "ETIQUETAS O TAGS": "</lote>",
            "CARACTER": "Obligatorio",
            "TIPO DE CAMPO": "-",
            "LONGITUD / FORMATO": "-"
        }
    ],
    table9:[
        {
            "No.": "en archivo XML\""
        },
        {
            "No.": "1",
            "Descripción de campo": "Fecha de emisión",
            "\"Tipo de campo\"": "Numérico",
            "Formato": "ddmmaaaa",
            "Longitud": "8",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag": "<claveAcceso>"
        },
        {
            "No.": "2",
            "Descripción de campo": "Tipo de comprobante",
            "\"Tipo de campo\"": "Numérico",
            "Formato": "Tabla 3",
            "Longitud": "2",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag": "<claveAcceso>"
        },
        {
            "No.": "3",
            "Descripción de campo": "Número de RUC",
            "\"Tipo de campo\"": "Numérico",
            "Formato": "1234567890001",
            "Longitud": "13",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag": "<claveAcceso>"
        },
        {
            "No.": "4",
            "Descripción de campo": "Tipo de ambiente",
            "\"Tipo de campo\"": "Numérico",
            "Formato": "Tabla 4",
            "Longitud": "1",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag": "<claveAcceso>"
        },
        {
            "No.": "5",
            "Descripción de campo": "Serie*",
            "\"Tipo de campo\"": "Numérico",
            "Formato": "001001",
            "Longitud": "6",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag": "<claveAcceso>"
        },
        {
            "No.": "6",
            "Descripción de campo": "Número secuencial*",
            "\"Tipo de campo\"": "Numérico",
            "Formato": "000000001",
            "Longitud": "9",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag": "<claveAcceso>"
        },
        {
            "No.": "7",
            "Descripción de campo": "Código numérico",
            "\"Tipo de campo\"": "Numérico",
            "Formato": "Numérico",
            "Longitud": "8",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag": "<claveAcceso>"
        },
        {
            "No.": "8",
            "Descripción de campo": "Tipo de emisión",
            "\"Tipo de campo\"": "Numérico",
            "Formato": "Tabla 2",
            "Longitud": "1",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag": "<claveAcceso>"
        },
        {
            "No.": "9",
            "Descripción de campo": "Dígito verificador (módulo 11)",
            "\"Tipo de campo\"": "Numérico",
            "Formato": "Numérico",
            "Longitud": "1",
            "Requisito": "Obligatorio",
            "\"Etiqueta o tag": "<claveAcceso>"
        }
    ],
    table10:[
        {
            "No.": "1",
            "Ruta o Directorios": "Comprobantes generados",
            "Observación": "Directorio donde se encuentren los documentos para ser firmados."
        },
        {
            "No.": "2",
            "Ruta o Directorios": "Comprobantes firmados electrónicamente",
            "Observación": "Directorio donde se guardarán los documentos firmados electrónicamente de manera satisfactoria."
        },
        {
            "No.": "2. 1",
            "Ruta o Directorios": "Comprobantes transmitidos y sin respuesta de autorización*",
            "Observación": "Directorio donde almacenarán los comprobantes firmados electrónicamente remitidos a la Administración Tributaria y no se ha recibido una respuesta."
        },
        {
            "No.": "3",
            "Ruta o Directorios": "Comprobantes autorizados",
            "Observación": "Directorio donde se almacenarán los comprobantes autorizados por el SRI y automáticamente deberán eliminarse de los directorios 1 y/o 2 únicamente si son autorizados."
        },
        {
            "No.": "4",
            "Ruta o Directorios": "Comprobantes no autorizados",
            "Observación": "Directorio donde se almacenarán los archivos con los motivos de por qué no se autorizó los comprobantes.\""
        },
        {
            "No.": "5",
            "Ruta o Directorios": "Comprobantes enviados",
            "Observación": "Directorio donde se almacenarán los comprobantes en estado en procesamiento."
        },
        {
            "No.": "5. 1",
            "Ruta o Directorios": "Comprobantes rechazados*",
            "Observación": "Directorio donde no cumple esquemas o sin autorización de emisión."
        }
    ],
    table11:[
        {
            "No.": "1",
            "Descripción (emisor o agente de retención)": "Número de RUC",
            "Tipo de campo": "Numérico",
            "Longitud": "13",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "2",
            "Descripción (emisor o agente de retención)": "Razón social / nombres o apellidos",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "3",
            "Descripción (emisor o agente de retención)": "Nombre comercial",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Opcional"
        },
        {
            "No.": "4",
            "Descripción (emisor o agente de retención)": "Dirección del establecimiento matriz",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "5",
            "Descripción (emisor o agente de retención)": "Dirección del establecimiento emisor",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Opcional"
        },
        {
            "No.": "6",
            "Descripción (emisor o agente de retención)": "Código del establecimiento emisor",
            "Tipo de campo": "Numérico",
            "Longitud": "3",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "7",
            "Descripción (emisor o agente de retención)": "Código del punto de emisión",
            "Tipo de campo": "Numérico",
            "Longitud": "3",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "8",
            "Descripción (emisor o agente de retención)": "Contribuyente especial (Número de resolución)",
            "Tipo de campo": "Numérico",
            "Longitud": "Min. 3 y Max. 5",
            "Requisito": "Opcional"
        },
        {
            "No.": "9",
            "Descripción (emisor o agente de retención)": "\"Obligado a llevar contabilidad (Opciones SI o"
        },
        {
            "No.": "NO)\"",
            "Descripción (emisor o agente de retención)": "De selección",
            "Tipo de campo": "2",
            "Longitud": "Opcional"
        },
        {
            "No.": "10",
            "Descripción (emisor o agente de retención)": "Logo del emisor",
            "Tipo de campo": "Imagen",
            "Longitud": "-",
            "Requisito": "Opcional"
        },
        {
            "No.": "11",
            "Descripción (emisor o agente de retención)": "Tipo de ambiente",
            "Tipo de campo": "Numérico",
            "Longitud": "1",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "12",
            "Descripción (emisor o agente de retención)": "Tipo de emisión",
            "Tipo de campo": "Numérico",
            "Longitud": "1",
            "Requisito": "Obligatorio"
        }
    ],
    table12:[
        {
            "No.": "1",
            "Descripción": "Impuestos y tarifas parametrizables",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "2",
            "Descripción": "Código identificador del producto o servicio asignado por el contribuyente.",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "2",
            "Descripción": "Código identificador auxiliar del producto o servicio",
            "Requisito": "Opcional"
        },
        {
            "No.": "3",
            "Descripción": "Nombre del producto o servicio",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "4",
            "Descripción": "Valor unitario",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "5",
            "Descripción": "Descuento",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "6",
            "Descripción": "Impuesto",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "7",
            "Descripción": "Tarifa del impuesto",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "8",
            "Descripción": "Campos adicionales (máximo tres campos de hasta 300 caracteres)",
            "Requisito": "Opcional"
        }
    ],
    table13:[
        {
            "No.": "1",
            "Descripción": "Identificación (Número de RUC, cédula o pasaporte)",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "2",
            "Descripción": "Nombres y apellidos o razón social",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "3",
            "Descripción": "Dirección de correo electrónico",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "4",
            "Descripción": "Placa (para el caso de guías de remisión)",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "5",
            "Descripción": "Teléfono",
            "Requisito": "Opcional"
        },
        {
            "No.": "6",
            "Descripción": "Dirección / ubicación",
            "Requisito": "Opcional"
        }
    ],
    table14:[
        {
            "No.": "1",
            "Descripción de llenado (comprador o agente retenido)": "Número secuencial del comprobante",
            "Tipo de campo": "Numérico",
            "Longitud": "9",
            "Requisito": "Obligatorio",
            "Comprobante": "TODOS"
        },
        {
            "No.": "2",
            "Descripción de llenado (comprador o agente retenido)": "Razón social / Nombres o apellidos",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Obligatorio",
            "Comprobante": "TODOS"
        },
        {
            "No.": "3",
            "Descripción de llenado (comprador o agente retenido)": "Identificación (RUC, Cédula, pasaporte, identificación del exterior o placa)",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max 20",
            "Requisito": "Obligatorio",
            "Comprobante": "TODOS"
        },
        {
            "No.": "4",
            "Descripción de llenado (comprador o agente retenido)": "Fecha de emisión",
            "Tipo de campo": "Numérico",
            "Longitud": "8",
            "Requisito": "Obligatorio",
            "Comprobante": "TODOS"
        },
        {
            "No.": "5",
            "Descripción de llenado (comprador o agente retenido)": "Número de la guía de remisión",
            "Tipo de campo": "Numérico",
            "Longitud": "15",
            "Requisito": "Opcional",
            "Comprobante": "CAMPO SOLO PARA FACTURA"
        },
        {
            "No.": "6",
            "Descripción de llenado (comprador o agente retenido)": "Denominación del comprobante de venta que se modifica",
            "Tipo de campo": "Numérico",
            "Longitud": "2",
            "Requisito": "Obligatorio",
            "Comprobante": "CAMPO SOLO PARA NOTAS DE CRÉDITO Y NOTAS DE DÉBITO"
        },
        {
            "No.": "7",
            "Descripción de llenado (comprador o agente retenido)": "Número del comprobante de venta que se modifica",
            "Tipo de campo": "Numérico",
            "Longitud": "15",
            "Requisito": "Obligatorio",
            "Comprobante": "CAMPO SOLO PARA NOTAS DE CRÉDITO Y NOTAS DE DÉBITO"
        },
        {
            "No.": "8",
            "Descripción de llenado (comprador o agente retenido)": "Denominación del comprobante de venta que motiva la retención",
            "Tipo de campo": "Numérico",
            "Longitud": "2",
            "Requisito": "Obligatorio",
            "Comprobante": "CAMPO SOLO PARA COMPROBANTES DE RETENCIÓN"
        },
        {
            "No.": "9",
            "Descripción de llenado (comprador o agente retenido)": "Número del comprobante de venta que motiva la retención",
            "Tipo de campo": "Numérico",
            "Longitud": "15",
            "Requisito": "Obligatorio",
            "Comprobante": "CAMPO SOLO PARA COMPROBANTE DE RETENCIÓN"
        },
        {
            "No.": "10",
            "Descripción de llenado (comprador o agente retenido)": "Ejercicio fiscal (mmaaaa)",
            "Tipo de campo": "Numérico",
            "Longitud": "6",
            "Requisito": "Obligatorio",
            "Comprobante": "CAMPO SOLO PARA COMPROBANTE DE RETENCIÓN"
        },
        {
            "No.": "11",
            "Descripción de llenado (comprador o agente retenido)": "Código numérico",
            "Tipo de campo": "Numérico",
            "Longitud": "8 / 23",
            "Requisito": "Obligatorio",
            "Comprobante": "TODOS"
        },
        {
            "No.": "12",
            "Descripción de llenado (comprador o agente retenido)": "Dígito verificador (Módulo 11)",
            "Tipo de campo": "Numérico",
            "Longitud": "1",
            "Requisito": "Obligatorio",
            "Comprobante": "TODOS"
        }
    ],
    table15:[
        {
            "No.": "1",
            "Descripción de Llenado": "Número secuencial del comprobante",
            "Tipo de campo": "Númerico",
            "Longitud": "9",
            "Requisito": "Obligatono"
        },
        {
            "No.": "2",
            "Descripción de Llenado": "Razón social/nombres o apellidos (Destinatario)",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Obligatono"
        },
        {
            "No.": "3",
            "Descripción de Llenado": "Identificación destinatario (RUC, cédula, pasaporte, identificación del exterior))",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "10 a 20",
            "Requisito": "Obligatono"
        },
        {
            "No.": "4",
            "Descripción de Llenado": "Dirección del punto de partida",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Obligatono"
        },
        {
            "No.": "5",
            "Descripción de Llenado": "Dirección del destinatario o destinos",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Obligatono"
        },
        {
            "No.": "6",
            "Descripción de Llenado": "Razón social / Nombres o apellidos (transportista o remitente)",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Obligatono"
        },
        {
            "No.": "7",
            "Descripción de Llenado": "Identificación transportista o remitente (ruc, cédula, pasaporte)",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "10 a 13",
            "Requisito": "Obligatono"
        },
        {
            "No.": "8",
            "Descripción de Llenado": "Número de placa",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "20",
            "Requisito": "Obligatono"
        },
        {
            "No.": "9",
            "Descripción de Llenado": "Descripción de la mercadería transportada",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Obligatono"
        },
        {
            "No.": "10",
            "Descripción de Llenado": "Cantidad de la mercadería transportada",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Libre",
            "Requisito": "Obligatono"
        },
        {
            "No.": "11",
            "Descripción de Llenado": "Motivo del traslado",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Obligatono"
        },
        {
            "No.": "12",
            "Descripción de Llenado": "Denominación del comprobante de venta",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "2",
            "Requisito": "Opcional"
        },
        {
            "No.": "13",
            "Descripción de Llenado": "Número de autorización del comprobante de venta",
            "Tipo de campo": "Númerico",
            "Longitud": "10 ó 37",
            "Requisito": "Opcional"
        },
        {
            "No.": "14",
            "Descripción de Llenado": "Fecha de emisión del comprobante de venta",
            "Tipo de campo": "Númerico",
            "Longitud": "8",
            "Requisito": "Opcional"
        },
        {
            "No.": "15",
            "Descripción de Llenado": "Numeración del comprobante de venta",
            "Tipo de campo": "Númerico",
            "Longitud": "15",
            "Requisito": "Opcional"
        },
        {
            "No.": "16",
            "Descripción de Llenado": "Número de la declaración aduanera",
            "Tipo de campo": "Númerico",
            "Longitud": "20",
            "Requisito": "Opcional"
        },
        {
            "No.": "17",
            "Descripción de Llenado": "Fecha de Inicio de transporte",
            "Tipo de campo": "Númerico",
            "Longitud": "8",
            "Requisito": "Obligatono"
        },
        {
            "No.": "18",
            "Descripción de Llenado": "Fecha de terminación del transporte",
            "Tipo de campo": "Númerico",
            "Longitud": "8",
            "Requisito": "Obligatono"
        },
        {
            "No.": "19",
            "Descripción de Llenado": "Ruta",
            "Tipo de campo": "Alfanumérico",
            "Longitud": "Max. 300",
            "Requisito": "Opcional"
        },
        {
            "No.": "20",
            "Descripción de Llenado": "Código del establecimiento del destinatario del producto",
            "Tipo de campo": "Númerico",
            "Longitud": "3",
            "Requisito": "Opcional"
        },
        {
            "No.": "21",
            "Descripción de Llenado": "Código numérico",
            "Tipo de campo": "Númerico",
            "Longitud": "8 ó 23",
            "Requisito": "Obligatono"
        },
        {
            "No.": "22",
            "Descripción de Llenado": "Dígito verificador",
            "Tipo de campo": "Númerico",
            "Longitud": "",
            "Requisito": "Obligatono"
        }
    ],
    talbe16:[
        {
            "Impuesto": "IVA",
            "Código": "2"
        },
        {
            "Impuesto": "ICE",
            "Código": "3"
        },
        {
            "Impuesto": "IRBPNR",
            "Código": "5"
        }
    ],
    table17:[
        {
            "Porcentaje de IVA": "0%",
            "Código": "0"
        },
        {
            "Porcentaje de IVA": "12%",
            "Código": "2"
        },
        {
            "Porcentaje de IVA": "14%",
            "Código": "3"
        },
        {
            "Porcentaje de IVA": "No Objeto de Impuesto",
            "Código": "6"
        },
        {
            "Porcentaje de IVA": "Exento de IVA",
            "Código": "7"
        },
        {
            "Porcentaje de IVA": "IVA diferenciado",
            "Código": "8"
        }
    ],
    table18:[
        {
            "Código": "3011",
            "Descripción": "ICE Cigarrillos Rubios",
            "Tarifa Ad Valorem enero 2023": "-",
            "Tarifa especifica de enero 2023": "0,17",
            "Tarifa Ad Valorem febrero a diciembre 2023": "-",
            "Tarifa especifica de febrero a diciembre 2023": "0,16"
        },
        {
            "Código": "3021",
            "Descripción": "ICE Cigarrillos Negros",
            "Tarifa Ad Valorem enero 2023": "-",
            "Tarifa especifica de enero 2023": "0,17",
            "Tarifa Ad Valorem febrero a diciembre 2023": "-",
            "Tarifa especifica de febrero a diciembre 2023": "0,16"
        },
        {
            "Código": "3023",
            "Descripción": "ICE Productos del Tabaco y Sucedáneos del Tabaco exce 0 Ci arillos",
            "Tarifa Ad Valorem enero 2023": "150%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "150%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3031",
            "Descripción": "ICE Bebidas Alcohólicas",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "10,36",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "10"
        },
        {
            "Código": "3041",
            "Descripción": "ICE Cerveza Industrial Gran Escala",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3041",
            "Descripción": "ICE Cerveza Industrial Mediana Escala",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3041",
            "Descripción": "ICE Cerveza Industrial Pequeña Escala",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3073",
            "Descripción": "ICE Vehículos Motorizados cuyo PVP sea hasta de 20000 USD",
            "Tarifa Ad Valorem enero 2023": "5%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "5%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3075",
            "Descripción": "ICE Vehículos Motorizados PVP entre 30000 y 40000",
            "Tarifa Ad Valorem enero 2023": "15%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "15%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3077",
            "Descripción": "ICE Vehículos Motorizados cuyo PVP superior USD 40.000 hasta 50.000",
            "Tarifa Ad Valorem enero 2023": "20%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "20%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3078",
            "Descripción": "ICE Vehículos Motorizados cuyo PVP superior USD 50.000 hasta 60.000",
            "Tarifa Ad Valorem enero 2023": "25%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "25%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3079",
            "Descripción": "ICE Vehículos Motorizados cuyo PVP superior USD 60.000 hasta 70.000",
            "Tarifa Ad Valorem enero 2023": "30%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "30%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3080",
            "Descripción": "ICE Vehículos Motorizados cuyo PVP superior USD 70.000",
            "Tarifa Ad Valorem enero 2023": "35%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "35%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3081",
            "Descripción": "ICE Aviones, Tricares, yates, Barcos de Recreo",
            "Tarifa Ad Valorem enero 2023": "15%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "10%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3092",
            "Descripción": "ICE Servicios de Televisión Prepagada",
            "Tarifa Ad Valorem enero 2023": "0%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "0%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3610",
            "Descripción": "ICE Perfumes y Aguas de Tocador",
            "Tarifa Ad Valorem enero 2023": "20%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "20%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3620",
            "Descripción": "ICE Videojuegos",
            "Tarifa Ad Valorem enero 2023": "0%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "0%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3630",
            "Descripción": "ICE Armas de Fuego, Armas deportivas y Municiones",
            "Tarifa Ad Valorem enero 2023": "300%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "30%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3640",
            "Descripción": "ICE Focos Incandescentes",
            "Tarifa Ad Valorem enero 2023": "100%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "100%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3660",
            "Descripción": "ICE Cuotas Membresías Afiliaciones Acciones",
            "Tarifa Ad Valorem enero 2023": "35%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "35%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3093",
            "Descripción": "ICE Servicios Telefonía Sociedades",
            "Tarifa Ad Valorem enero 2023": "15%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "15%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3101",
            "Descripción": "ICE Bebidas Energizantes",
            "Tarifa Ad Valorem enero 2023": "10%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "10%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3053",
            "Descripción": "ICE Bebidas Gaseosas con Alto Contenido de Azúcar",
            "Tarifa Ad Valorem enero 2023": "-",
            "Tarifa especifica de enero 2023": "0,19 por 100 gramos de azúcar",
            "Tarifa Ad Valorem febrero a diciembre 2023": "-",
            "Tarifa especifica de febrero a diciembre 2023": "0,18 por 100 gramos de azúcar"
        },
        {
            "Código": "3054",
            "Descripción": "ICE Bebidas Gaseosas con Bajo Contenido de Azúcar",
            "Tarifa Ad Valorem enero 2023": "10%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "10%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3111",
            "Descripción": "ICE Bebidas No Alcohólicas",
            "Tarifa Ad Valorem enero 2023": "-",
            "Tarifa especifica de enero 2023": "0,19 por 100 gramos de azúcar",
            "Tarifa Ad Valorem febrero a diciembre 2023": "-",
            "Tarifa especifica de febrero a diciembre 2023": "0,18 por 100 gramos de azúcar"
        },
        {
            "Código": "3043",
            "Descripción": "ICE Cerveza Artesanal",
            "Tarifa Ad Valorem enero 2023": "-",
            "Tarifa especifica de enero 2023": "1,55",
            "Tarifa Ad Valorem febrero a diciembre 2023": "-",
            "Tarifa especifica de febrero a diciembre 2023": "1,5"
        },
        {
            "Código": "3033",
            "Descripción": "ICE Alcohol",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "10,36",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "10"
        },
        {
            "Código": "3671",
            "Descripción": "ICE calefones y sistemas de calentamiento de agua a gas SRI",
            "Tarifa Ad Valorem enero 2023": "100%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "100%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3684",
            "Descripción": "ICE vehículos motorizados camionetas y de rescate cuyo PVP sea hasta DE 30.000 USD",
            "Tarifa Ad Valorem enero 2023": "5%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "5%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3686",
            "Descripción": "ICE vehículos motorizados excepto camionetas y de rescate cuyo PVP sea superior USD 20.000 hasta DE 30.000",
            "Tarifa Ad Valorem enero 2023": "10%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "10%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3688",
            "Descripción": "ICE vehículos híbridos cuyo PVP sea de hasta USD. 35.000",
            "Tarifa Ad Valorem enero 2023": "0%",
            "Tarifa especifica de enero 2023": "",
            "Tarifa Ad Valorem febrero a diciembre 2023": "0%",
            "Tarifa especifica de febrero a diciembre 2023": ""
        },
        {
            "Código": "3691",
            "Descripción": "ICE vehículos híbridos cuyo PVP superior USD. 35.000 hasta 40.000",
            "Tarifa Ad Valorem enero 2023": "8%",
            "Tarifa especifica de enero 2023": "",
            "Tarifa Ad Valorem febrero a diciembre 2023": "8%",
            "Tarifa especifica de febrero a diciembre 2023": ""
        },
        {
            "Código": "3692",
            "Descripción": "ICE vehículos híbridos cuyo PVP superior USD. 40.000 hasta 50.000",
            "Tarifa Ad Valorem enero 2023": "14%",
            "Tarifa especifica de enero 2023": "",
            "Tarifa Ad Valorem febrero a diciembre 2023": "14%",
            "Tarifa especifica de febrero a diciembre 2023": ""
        },
        {
            "Código": "3695",
            "Descripción": "ICE vehículos híbridos cuyo PVP superior USD. 50.000 hasta 60.000",
            "Tarifa Ad Valorem enero 2023": "20%",
            "Tarifa especifica de enero 2023": "",
            "Tarifa Ad Valorem febrero a diciembre 2023": "20%",
            "Tarifa especifica de febrero a diciembre 2023": ""
        },
        {
            "Código": "3696",
            "Descripción": "ICE vehículos híbridos cuyo PVP superior USD. 60.000 hasta 70.000",
            "Tarifa Ad Valorem enero 2023": "26%",
            "Tarifa especifica de enero 2023": "",
            "Tarifa Ad Valorem febrero a diciembre 2023": "26%",
            "Tarifa especifica de febrero a diciembre 2023": ""
        },
        {
            "Código": "3698",
            "Descripción": "ICE vehículos híbridos cuyo PVP superior a USD 70.000",
            "Tarifa Ad Valorem enero 2023": "32%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "32%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3682",
            "Descripción": "ICE consumibles tabaco calentado y líquidos con nicotina SRI",
            "Tarifa Ad Valorem enero 2023": "150%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "150%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3681",
            "Descripción": "ICE servicios de telefonía móvil personas naturales",
            "Tarifa Ad Valorem enero 2023": "0%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "0%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3680",
            "Descripción": "ICE fundas plásticas",
            "Tarifa Ad Valorem enero 2023": "-",
            "Tarifa especifica de enero 2023": "0,1",
            "Tarifa Ad Valorem febrero a diciembre 2023": "-",
            "Tarifa especifica de febrero a diciembre 2023": "0,08"
        },
        {
            "Código": "3533",
            "Descripción": "ICE Import. Bebidas Alcohólicas",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3541",
            "Descripción": "ICE Cerveza Gran Escala CAE",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3541",
            "Descripción": "ICE Cerveza Industrial de Mediana Escala CAE",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3541",
            "Descripción": "ICE Cerveza Industrial de Pequeña Escala CAE",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3542",
            "Descripción": "ICE Cigarrillos Rubios CAE",
            "Tarifa Ad Valorem enero 2023": "-",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "-",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3543",
            "Descripción": "ICE Cigarrillos Negros CAE",
            "Tarifa Ad Valorem enero 2023": "-",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "-",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3544",
            "Descripción": "ICE Productos del Tabaco y Sucedáneos del Tabaco Excepto Cigarrillos CAE",
            "Tarifa Ad Valorem enero 2023": "150%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "150%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3581",
            "Descripción": "ICE Aeronaves CAE",
            "Tarifa Ad Valorem enero 2023": "15%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "15%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3582",
            "Descripción": "ICE Aviones, Avionetas y Helicópteros Exct. Aquellos destinados Al Trans. CAE",
            "Tarifa Ad Valorem enero 2023": "15%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "15%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3710",
            "Descripción": "ICE Perfumes Aguas de Tocador Cae",
            "Tarifa Ad Valorem enero 2023": "20%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "20%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3720",
            "Descripción": "ICE Video Juegos CAE",
            "Tarifa Ad Valorem enero 2023": "35%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "35%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3730",
            "Descripción": "ICE Importaciones Armas de Fuego, Armas deportivas y Municiones CAE",
            "Tarifa Ad Valorem enero 2023": "300%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "300%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3740",
            "Descripción": "ICE Focos Incandescentes CAE",
            "Tarifa Ad Valorem enero 2023": "100%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "100%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3871",
            "Descripción": "ICE-vehículos motorizados cuyo PVP SEA hasta de 20000 USD SENAE",
            "Tarifa Ad Valorem enero 2023": "5%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "5%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3873",
            "Descripción": "ICE-vehículos motorizados PVP entre 30000 Y 40000 SENAE",
            "Tarifa Ad Valorem enero 2023": "15%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "15%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3874",
            "Descripción": "ICE-vehículos motorizados cuyo PVP superior USD 40.000 hasta 50.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "20%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "20%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3875",
            "Descripción": "ICE-vehículos motorizados cuyo PVP superior USD 50.000 hasta 60.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "25%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "25%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3876",
            "Descripción": "ICE-vehículos motorizados cuyo PVP superior USD 60.000 hasta 70.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "30%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "30%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3877",
            "Descripción": "ICE-vehículos motorizados cuyo PVP superior USD 70.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "35%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "35%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3878",
            "Descripción": "ICE-Aviones, Tricares, Yates, Barcos de Rec SENAE",
            "Tarifa Ad Valorem enero 2023": "15%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "10%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3601",
            "Descripción": "ICE Bebidas Energizantes SENAE",
            "Tarifa Ad Valorem enero 2023": "10%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "10%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3552",
            "Descripción": "ICE bebidas gaseosas con alto contenido de azúcar SENAE",
            "Tarifa Ad Valorem enero 2023": "-",
            "Tarifa especifica de enero 2023": "0,19 por gramos de azúcar",
            "Tarifa Ad Valorem febrero a diciembre 2023": "-",
            "Tarifa especifica de febrero a diciembre 2023": "0,18 por 100 gramos de azúcar"
        },
        {
            "Código": "3553",
            "Descripción": "ICE bebidas gaseosas con bajo contenido de azúcar SENAE",
            "Tarifa Ad Valorem enero 2023": "10%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "10%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3602",
            "Descripción": "ICE bebidas no alcohólicas SENAE",
            "Tarifa Ad Valorem enero 2023": "-",
            "Tarifa especifica de enero 2023": "0,19 por gramos de azúcar",
            "Tarifa Ad Valorem febrero a diciembre 2023": "-",
            "Tarifa especifica de febrero a diciembre 2023": "0,18 por 100 gramos de azúcar"
        },
        {
            "Código": "3545",
            "Descripción": "ICE cerveza artesanal SENAE",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "1,55",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "1,5"
        },
        {
            "Código": "3532",
            "Descripción": "ICE Import. alcohol SENAE",
            "Tarifa Ad Valorem enero 2023": "75%",
            "Tarifa especifica de enero 2023": "10,36",
            "Tarifa Ad Valorem febrero a diciembre 2023": "75%",
            "Tarifa especifica de febrero a diciembre 2023": "10"
        },
        {
            "Código": "3671",
            "Descripción": "ICE calefones y sistemas de calentamiento de agua a gas SRI",
            "Tarifa Ad Valorem enero 2023": "100%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "100%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3771",
            "Descripción": "ICE calefones y sistemas de calentamiento de agua a gas SENAE",
            "Tarifa Ad Valorem enero 2023": "100%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "100%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3685",
            "Descripción": "ICE vehículos motorizados camionetas y de rescate PVP sea hasta DE 30.000 USD SENAE",
            "Tarifa Ad Valorem enero 2023": "5%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "5%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3687",
            "Descripción": "ICE vehículos motorizados excepto camionetas y de rescate cuyo PVP sea superior USD 20.000 hasta de 30.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "10%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "10%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3689",
            "Descripción": "ICE vehículos híbridos cuyo PVP sea de hasta USD. 35.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "0%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "0%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3690",
            "Descripción": "ICE vehículos híbridos cuyo PVP superior USD. 35.000 hasta 40.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "8%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "8%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3693",
            "Descripción": "ICE vehículos híbridos cuyo PVP superior USD. 40.000 hasta 50.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "14%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "14%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3694",
            "Descripción": "ICE vehículos híbridos cuyo PVP superior USD. 50.000 hasta 60.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "20%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "20%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3697",
            "Descripción": "ICE vehículos híbridos cuyo PVP superior USD. 60.000 hasta 70.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "26%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "26%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3699",
            "Descripción": "ICE vehículos híbridos cuyo PVP superior a USD 70.000 SENAE",
            "Tarifa Ad Valorem enero 2023": "32%",
            "Tarifa especifica de enero 2023": "-",
            "Tarifa Ad Valorem febrero a diciembre 2023": "32%",
            "Tarifa especifica de febrero a diciembre 2023": "-"
        },
        {
            "Código": "3683",
            "Descripción": "ICE consumibles tabaco calentado y líquidos con nicotina SENAE",
            "Tarifa Ad Valorem enero 2023": "150%",
            "Tarifa especifica de enero 2023": "",
            "Tarifa Ad Valorem febrero a diciembre 2023": "50%"
        }
    ],
    table19:[
        {
            "Impuesto a retener": "RENTA",
            "Código": "1"
        },
        {
            "Impuesto a retener": "IVA",
            "Código": "2"
        },
        {
            "Impuesto a retener": "ISD",
            "Código": "6"
        }
    ],
    table20:[
        {
            "Porcentaje IVA": "10%",
            "Código": "9"
        },
        {
            "Porcentaje IVA": "20%",
            "Código": "10"
        },
        {
            "Porcentaje IVA": "30%",
            "Código": "1"
        },
        {
            "Porcentaje IVA": "50%",
            "Código": "11"
        },
        {
            "Porcentaje IVA": "70%",
            "Código": "2"
        },
        {
            "Porcentaje IVA": "100%",
            "Código": "3"
        },
        {
            "Porcentaje IVA": "0%",
            "Código": "7"
        },
        {
            "Porcentaje IVA": "0%",
            "Código": "8"
        }
    ],
    table201:[
        {
            "\"Porcentaje ISD\"": "5%",
            "Código": "4580",
            "Desde": "-",
            "Hasta": "Hasta el 31 de diciembre de 2021"
        },
        {
            "\"Porcentaje ISD\"": "4.75%",
            "Código": "4580",
            "Desde": "1 de enero de 2022*",
            "Hasta": "31 de marzo de 2022"
        },
        {
            "\"Porcentaje ISD\"": "4.50%",
            "Código": "4580",
            "Desde": "1 de abril de 2022*",
            "Hasta": "30 de junio de 2022"
        },
        {
            "\"Porcentaje ISD\"": "4.25%",
            "Código": "4580",
            "Desde": "1 de julio de 2022*",
            "Hasta": "30 de septiembre de 2022"
        },
        {
            "\"Porcentaje ISD\"": "4.00%",
            "Código": "4580",
            "Desde": "1 de octubre de 2022*",
            "Hasta": "31 de diciembre de 2022"
        }
    ],
    table21:[
        {
            "No.": "1",
            "Campos de valores": "Sub total IVA _%:",
            "Tipo de campo": "Sumarán todos los precios totales de los productos gravados con la tarifa de IVA vigente.",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "2",
            "Campos de valores": "Sub total 0%:",
            "Tipo de campo": "Sumarán todos los precios totales de los productos gravados con tarifa de IVA 0%.",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "3",
            "Campos de valores": "Sub total no objeto IVA:",
            "Tipo de campo": "Sumarán todos los precios totales de los productos No Ob jeto de IVA.",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "3",
            "Campos de valores": "Sub total exento de IVA:",
            "Tipo de campo": "Sumarán todos los precios totales de los productos Exento de IVA.",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "4",
            "Campos de valores": "Sub total:",
            "Tipo de campo": "Sumará las tres bases (Tarifa de IVA vigente, 0%, no objeto de IVA o Exento de IVA).",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "5",
            "Campos de valores": "Total descuento:",
            "Tipo de campo": "Sumará los valores de los descuentos.",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "6",
            "Campos de valores": "Valor ICE:",
            "Tipo de campo": "Calculará del campo Sub total según el porcentaje ingresado, este campo será editable por la naturaleza del cálculo del impuesto.",
            "Requisito": "Obligatorio cuando corresponda / editable"
        },
        {
            "No.": "7",
            "Campos de valores": "Valor IRBPNR:",
            "Tipo de campo": "Este campo será editable por la naturaleza del cálculo del impuesto.",
            "Requisito": "Obligatorio cuando corresponda / editable"
        },
        {
            "No.": "8",
            "Campos de valores": "Valor IVA _%:",
            "Tipo de campo": "Sumará el campo Sub total IVA _% y el valor del campo Valor ICE, el resultado aplicará la tarifa de IVA vigente.",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "9",
            "Campos de valores": "Propina:",
            "Tipo de campo": "Este campo aparecerá vacío, si ingresa un valor el sistema validará que el valor ingresado  no supere el 10% del campo Sub total\"",
            "Requisito": "Obligatorio"
        },
        {
            "No.": "10",
            "Campos de valores": "VALOR TOTAL",
            "Tipo de campo": "Sumará los campos Sub total, ICE, IRBPNR, Valor IVA _% y Propina.",
            "Requisito": "Obligatorio"
        }
    ],
    table22:[
        {
            "IMPUESTO A RETENER": "IVA PRESUNTIVO Y RENTA",
            "CÓDIGO": "4"
        }
    ],
    table23:[
        {"IVA":[
            {
                "PORCENTAJE IVA RETENIDO Y/O PRESUNTIVO": "** 100%",
                "CÓDIGO": "3",
                "\"TARIFA EN EL XML\"": "1"
            },
            {
                "PORCENTAJE IVA RETENIDO Y/O PRESUNTIVO": "\"12% (Retención de IVA presuntivo por Editores a Margen de Comercialización Voceadores)\"",
                "CÓDIGO": "4",
                "\"TARIFA EN EL XML\"": "12"
            },
            {
                "PORCENTAJE IVA RETENIDO Y/O PRESUNTIVO": "\"* 100% (Retención IVA venta periódicos y/o Revistas a Distribuidores)\"",
                "CÓDIGO": "5",
                "\"TARIFA EN EL XML\"": "100"
            },
            {
                "PORCENTAJE IVA RETENIDO Y/O PRESUNTIVO": "\"* 100% (Retención IVA Venta de Periódicos y/o revistas a voceadores)\"",
                "CÓDIGO": "6",
                "\"TARIFA EN EL XML\"": "100"
            }
        ],
        "RENTA":[
            {
                "PORCENTAJE RENTA": "0.002 (2 por mil)",
                "CÓDIGO": "327",
                "TARIFA EN EL XML": "20"
            },
            {
                "PORCENTAJE RENTA": "0.003 (3 por mil)",
                "CÓDIGO": "328",
                "TARIFA EN EL XML": "30"
            }
        ]
    }
    ],
    tableerror:[
        {
            "CÓDIGO DE ERROR": "2",
            "DESCRIPCIÓN": "RUC del emisor se encuentra NO ACTIVO.",
            "MOTIVO DE ERROR": "Verificar que el número de RUC se encuentre en estado ACTIVO.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "10",
            "DESCRIPCIÓN": "Establecimiento del emisor se encuentra Clausurado.",
            "MOTIVO DE ERROR": "No se autorizará comprobantes si el establecimiento emisor ha sido clausurado, automáticamente se habilitará el servicio una vez concluido la clausura.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "26",
            "DESCRIPCIÓN": "Tamaño máximo superado",
            "MOTIVO DE ERROR": "Tamaño del archivo supera lo establecido",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "27",
            "DESCRIPCIÓN": "Clase no permitido",
            "MOTIVO DE ERROR": "La clase del contribuyente no puede emitir comprobantes electrónicos.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "28",
            "DESCRIPCIÓN": "Acuerdo de medios electrónicos no aceptado",
            "MOTIVO DE ERROR": "Siempre el contribuyente debe haber aceptado el acuerdo de medio electrónicos en el cual se establece que se acepta que lleguen las notificaciones al buzón del contribuyente.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "35",
            "DESCRIPCIÓN": "Documento inválido",
            "MOTIVO DE ERROR": "Cuando el XML no pasa validación de esquema.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "36",
            "DESCRIPCIÓN": "Versión esquema descontinuada",
            "MOTIVO DE ERROR": "Cuando la versión del esquema no es la correcta.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "37",
            "DESCRIPCIÓN": "RUC sin autorización de emisión",
            "MOTIVO DE ERROR": "Cuando el RUC del emisor no cuenta con una solicitud de emisión de comprobantes electrónicos.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "39",
            "DESCRIPCIÓN": "Firma inválida",
            "MOTIVO DE ERROR": "Firma electrónica del emisor no es válida.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "40",
            "DESCRIPCIÓN": "Error en el certificado",
            "MOTIVO DE ERROR": "No se encontró el certificado o no se puede convertir en certificad X509.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "43",
            "DESCRIPCIÓN": "Clave acceso registrada",
            "MOTIVO DE ERROR": "Cuando la clave de acceso ya se encuentra registrada en la base de datos.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "45",
            "DESCRIPCIÓN": "Secuencial registrado",
            "MOTIVO DE ERROR": "Secuencial del comprobante ya se encuentra registrado en la base de datos",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "46",
            "DESCRIPCIÓN": "RUC no existe",
            "MOTIVO DE ERROR": "Cuando el RUC emisor no existe en el Registro Único de Contribuyentes.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "47",
            "DESCRIPCIÓN": "Tipo de comprobante no existe",
            "MOTIVO DE ERROR": "Cuando envían en el tipo de comprobante uno que no exista en el catálogo de nuestros tipos de comprobantes.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "48",
            "DESCRIPCIÓN": "Esquema XSD no existe",
            "MOTIVO DE ERROR": "Cuando el esquema para el tipo de comprobante enviado no existe.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "49",
            "DESCRIPCIÓN": "Argumentos que envían al WS nulos",
            "MOTIVO DE ERROR": "Cuando se consume el WS con argumentos nulos.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "50",
            "DESCRIPCIÓN": "Error interno general",
            "MOTIVO DE ERROR": "Cuando ocurre un error inesperado en el servidor.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "52",
            "DESCRIPCIÓN": "Error en diferencias",
            "MOTIVO DE ERROR": "Cuando existe error en los cálculos del comprobante.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "56",
            "DESCRIPCIÓN": "Establecimiento cerrado",
            "MOTIVO DE ERROR": "Cuando el establecimiento desde el cual se genera el comprobante se encuentra cerrado.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "57",
            "DESCRIPCIÓN": "Autorización suspendida",
            "MOTIVO DE ERROR": "Cuando la autorización para emisión de comprobantes electrónicos para el emisor se encuentra suspendida por procesos de control de la Administración Tributaria.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "58",
            "DESCRIPCIÓN": "Error en la estructura de clave acceso",
            "MOTIVO DE ERROR": "Cuando la clave de acceso tiene componentes diferentes a los del comprobante.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "63",
            "DESCRIPCIÓN": "RUC clausurado",
            "MOTIVO DE ERROR": "Cuando el RUC del emisor se encuentra clausurado por procesos de control de la Administración Tributaria.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "65",
            "DESCRIPCIÓN": "Fecha de emisión extemporánea",
            "MOTIVO DE ERROR": "Cuando el comprobante emitido no fue enviado de acuerdo con el tiempo del tipo de emisión en el cual fue realizado.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "EMISOR/RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "67",
            "DESCRIPCIÓN": "Fecha inválida",
            "MOTIVO DE ERROR": "Cuando existe errores en el formato de la fecha.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "70",
            "DESCRIPCIÓN": "Clave de acceso en procesamiento",
            "MOTIVO DE ERROR": "Cuando se desea enviar un comprobante que ha sido enviado anteriormente y el mismo no ha terminado su procesamiento.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "80",
            "DESCRIPCIÓN": "Error en la estructura de clave acceso",
            "MOTIVO DE ERROR": "Cuando se ejecuta la consulta de autorización por clave de acceso y el valor de este parámetro supera los 49 dígitos, tiene caracteres alfanuméricos o cuando el tag (claveAccesoComprobante) está vacío",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "AUTORIZACIÓN"
        },
        {
            "CÓDIGO DE ERROR": "82",
            "DESCRIPCIÓN": "Error en la fecha de inicio de transporte",
            "MOTIVO DE ERROR": "Cuando la fecha de inicio de transporte es menor a la fecha de emisión de la guía de remisión.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "92",
            "DESCRIPCIÓN": "Error al validar monto de devolución del IVA.",
            "MOTIVO DE ERROR": "Cuando el valor registrado en el campo de devolución del IVA, en facturas y notas de débito, no corresponde al que fue autorizado por el servicio web DIG.",
            "VALIDACIÓN: RECEPCIÓN /AUTORIZACIÓN/ EMISOR": "RECEPCIÓN"
        }
    ],
    tableadvertencia:[
        {
            "CÓDIGO DE ADVERTENCIA": "59",
            "DESCRIPCIÓN": "Identificación no existe",
            "POSIBLE SOLUCIÓN": "Cuando el número de la identificación del adquirente no existe."
        },
        {
            "CÓDIGO DE ADVERTENCIA": "60",
            "DESCRIPCIÓN": "Ambiente ejecución.",
            "POSIBLE SOLUCIÓN": "Siempre que el comprobante sea emitido en ambiente de certificación o pruebas se enviará como parte de la autorización esta advertencia."
        },
        {
            "CÓDIGO DE ADVERTENCIA": "62",
            "DESCRIPCIÓN": "Identificación incorrecta",
            "POSIBLE SOLUCIÓN": "Cuando el número de la identificación del adquirente del comprobante está incorrecto. Por ejemplo, cédulas no pasan el dígito verificador"
        },
        {
            "CÓDIGO DE ADVERTENCIA": "68",
            "DESCRIPCIÓN": "Documento sustento",
            "POSIBLE SOLUCIÓN": "Cuando el comprobante relacionado no existe como electrónico."
        }
    ],
    tablevalidacion:[
        {
            "ORDEN": "1",
            "VALIDACIÓN": "Validación XML",
            "DESCRIPCIÓN": "Tamaño archivo Esquema activo XML bien formado y válido"
        },
        {
            "ORDEN": "2",
            "VALIDACIÓN": "Validación contribuyente emisor",
            "DESCRIPCIÓN": "RUC activo Establecimiento activo Autorización para emitir comprobantes electrónicos activa Autorización para emisión del tipo de comprobante"
        },
        {
            "ORDEN": "3",
            "VALIDACIÓN": "Validación unicidad",
            "DESCRIPCIÓN": "Clave acceso única Secuencial único "
        },
        {
            "ORDEN": "4",
            "VALIDACIÓN": "Validación Firma",
            "DESCRIPCIÓN": "Validez firma y cadena de confianza OCSP"
        },
        {
            "ORDEN": "5",
            "VALIDACIÓN": "Verificaciones adicionales",
            "DESCRIPCIÓN": "Fecha emisión identificación del receptor del comprobante documentos de sustento"
        },
        {
            "ORDEN": "6",
            "VALIDACIÓN": "Validación diferencias",
            "DESCRIPCIÓN":""
        }
    ],
    tableerrorvalidacion:[
        {
            "CÓDIGO DE ERROR": "34",
            "DESCRIPCIÓN": "Comprobante no autorizado",
            "POSIBLE SOLUCIÓN": "Cuando el comprobante no ha sido autorizado como parte de la solicitud de emisión del contribuyente.",
            "VALIDACIÓN: RECEPCIÓN/AUTORIZACIÓN/EMISOR": "EMISOR"
        },
        {
            "CÓDIGO DE ERROR": "42",
            "DESCRIPCIÓN": "Certificado revocado",
            "POSIBLE SOLUCIÓN": "Certificado que ha superado su fecha de caducidad, y no ha sido renovado.",
            "VALIDACIÓN: RECEPCIÓN/AUTORIZACIÓN/EMISOR": "EMISOR"
        },
        {
            "CÓDIGO DE ERROR": "52",
            "DESCRIPCIÓN": "Error en diferencias",
            "POSIBLE SOLUCIÓN": "Cuando existe error en los cálculos del comprobante.",
            "VALIDACIÓN: RECEPCIÓN/AUTORIZACIÓN/EMISOR": "EMISOR"
        },
        {
            "CÓDIGO DE ERROR": "64",
            "DESCRIPCIÓN": "Código documento sustento",
            "POSIBLE SOLUCIÓN": "Cuando el código del documento sustento no existe en el catálogo de documentos que se tiene en la Administración.",
            "VALIDACIÓN: RECEPCIÓN/AUTORIZACIÓN/EMISOR": "EMISOR"
        },
        {
            "CÓDIGO DE ERROR": "65",
            "DESCRIPCIÓN": "Fecha de emisión extemporánea",
            "POSIBLE SOLUCIÓN": "Cuando el comprobante emitido no fue enviado de acuerdo con el tiempo del tipo de emisión en el cual fue realizado.",
            "VALIDACIÓN: RECEPCIÓN/AUTORIZACIÓN/EMISOR": "EMISOR/ RECEPCIÓN"
        },
        {
            "CÓDIGO DE ERROR": "69",
            "DESCRIPCIÓN": "Identificación del receptor",
            "POSIBLE SOLUCIÓN": "Cuando la identificación asociada al adquirente no existe. En general cuando el RUC del adquirente no existe en el Registro Único de Contribuyentes.",
            "VALIDACIÓN: RECEPCIÓN/AUTORIZACIÓN/EMISOR": "EMISOR"
        }
    ],
    tableerrordevolucion:[
        {
            "CÓDIGO DE VALIDACIÓN": "2000 EXITO",
            "DESCRIPCIÓN": "Éxito."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "2001 EXITO_VALIDACION",
            "DESCRIPCIÓN": "Validación exitosa."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3000 ERROR_FORMATO",
            "DESCRIPCIÓN": "Estimado contribuyente, los campos registrados no cu mplen con el formato establecido."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3001 ERROR_TRANSACCION",
            "DESCRIPCIÓN": "No se logró hacer la transacción."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3003 ERROR_CLAVE_YA_PROCESADA",
            "DESCRIPCIÓN": "Comprobante ya procesado."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3004 ERROR_CODIGO_OPERACION_INVALIDO",
            "DESCRIPCIÓN": "Código operación inválido."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3005 ERROR_INTERNO_SERVIDOR",
            "DESCRIPCIÓN": "Se ha producido un error."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3006 ERROR_TIME_OUT",
            "DESCRIPCIÓN": "No se ha podido responder a tiempo."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3007 ERROR_CODIGO_BENEFICIO",
            "DESCRIPCIÓN": "Estimado contribuyente, el código de verificación ingresado no se encuentra vigente."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3008 ERROR_WS_NO_DISPONIBLE",
            "DESCRIPCIÓN": "WEB Service no disponible."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3009 ERROR_WS_NO_AUTORIZADO",
            "DESCRIPCIÓN": "No está autorizado."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3011 ERROR_NO_MONTO_MINIMO",
            "DESCRIPCIÓN": "El valor no cumple en monto mínimo a devolver."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3013 ERROR_TARIFA_IMPUESTO",
            "DESCRIPCIÓN": "La tarifa del impuesto calculado no coincide con el enviado."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3014 ERROR_TOKEN_BENEFICIARIO",
            "DESCRIPCIÓN": "El token no pertenece al emisor."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3015 ERROR_CANAL_AUTOMATICO_NO_HABILITADO_SALDO",
            "DESCRIPCIÓN": "El beneficiario no tiene el canal automático habilitado o no existe un monto a devolver."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "3016: ERROR_MULTIPLE_TRANSACCIONES_LOTE",
            "DESCRIPCIÓN": "El beneficiario registra más de una transacción en el lote enviado"
        },
        {
            "CÓDIGO DE VALIDACIÓN": "4000 LOTE_RECIBIDO",
            "DESCRIPCIÓN": "Lote recibido."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "4001 LOTE_RECHAZADO",
            "DESCRIPCIÓN": "Lote rechazado."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "4002 LOTE_EN_PROCESO",
            "DESCRIPCIÓN": "Lote en proceso."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "4003 LOTE_PROCESADO",
            "DESCRIPCIÓN": "Lote procesado."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "5001 ERROR_CONFIGURACION_PILOTO",
            "DESCRIPCIÓN": "Los parámetros: rucs, fecha inicio o fecha fin para el piloto no están configurados."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6000 ANULACION_ERROR",
            "DESCRIPCIÓN": "Error al realizar la anulación."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6001 ANULACION_COMPROBANTE_NO_ENCONTRADO",
            "DESCRIPCIÓN": "No se realizó la transacción: comprobante electrónico no encontrado."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6002 ANULACION_IVA_DEVOLVER_DIFERENTES",
            "DESCRIPCIÓN": "No se realizó la transacción: el monto del IVA a devolver no es igual al que se registró en el débito."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6004 ANULACION_BENEFICIO_INCORRECTO",
            "DESCRIPCIÓN": "El código del beneficio no corresponde al registrado en el SRI."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6005 ANULACION_FECHA_DIFERENTE_HOY",
            "DESCRIPCIÓN": "La fecha de emisión no corresponde a la de hoy."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6006 ANULACION_TIPO_COMPROBANTE_INCORRECTO",
            "DESCRIPCIÓN": "El comprobante tiene que ser una factura o una nota de débito."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6007 ANULACION_ENVIADA_EXITO",
            "DESCRIPCIÓN": "Anulación enviada con éxito."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6008 ANULACION_IVA_DEVOLVER_NO_ENCONTRADO",
            "DESCRIPCIÓN": "No se realizó la transacción: falta el monto del IVA a devolver."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6009 ANULACION_IDENTIFICACIONES_DIFERENTES",
            "DESCRIPCIÓN": "No se realizó la transacción: la identificación no corresponde a la clave de acceso."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6010 ANULACION_IVA_CALCULADO_DIFERENTES",
            "DESCRIPCIÓN": "No se realizó la transacción: el cálculo del IVA a devolver no es igual al que se registró en el débito."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6011 ANULACION_BASE_IMPONIBLE_DIFERENTES",
            "DESCRIPCIÓN": "No se realizó la transacción: la base imponible no es igual a la que se registró en el débito."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "6012 ANULACION_NO_SALDO_DISPONIBLE",
            "DESCRIPCIÓN": "No se realizó la transacción: no tiene saldo disponible."
        },
        {
            "CÓDIGO DE VALIDACIÓN": "7000 BENEFICIARIOS_ARCHIVO_NO_ENCONTRADO",
            "DESCRIPCIÓN": "No existen registros en el canal automático."
        }
    ]
}

module.exports = {
	p_generar_factura_xml,
    p_obtener_codigo_autorizacion_desde_comprobante
};