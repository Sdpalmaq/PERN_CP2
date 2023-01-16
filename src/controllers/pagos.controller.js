const { response } = require('express');
const req = require('express/lib/request')
const { db } = require('../config/connection')



const getPagos = async (req, res) => {
    try {
        const cabecera = await db.any(`SELECT * FROM public.cp_cabecera;`)
        res.json(cabecera)
    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }
}


const getAllPagoDetalles = async (req, res) => {

    try {
        const cabecera = await db.any(`SELECT*FROM public.cp_cabecera;`);
        let response = [];
        for (let i = 0; i < cabecera.length; i++) {
            let detallePago = await db.any(`SELECT det.* from cp_cabecera cab, cp_detalle det where cab.id_cabecera = det.id_cabecera and
             det.id_cabecera = $1;`, [cabecera[i].id_cabecera]);
            cabecera[i].cab_detalle = detallePago
            response.push(cabecera[i])
        }
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }
}

const getPago = async (req, res) => {
    try {
        const id_cabecera = req.params.id_cabecera
        console.log('ds', req.params.id_cabecera)
        const cabecera = await db.one(`SELECT*FROM public.cp_cabecera where id_cabecera = $1;`, [id_cabecera]);
        let response = [];
        let detallePago = await db.any(`SELECT det.* from cp_cabecera cab, cp_detalle det where cab.id_cabecera = det.id_cabecera and
            det.id_cabecera = $1;`, [cabecera.id_cabecera]);
        cabecera.cab_detalle = detallePago
        response.push(cabecera)
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }


}

const createPagoDetalle = async (req, res) => {
    const { id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total, detalles } = req.body
    try {
        const cabecera = await db.one(`INSERT INTO public.cp_cabecera(
            id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total, cab_estado)
            VALUES ($1, $2, $3, $4, $5, $6, true)  returning*;`, [id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total])

        //Insercion del detalle
        let detalle = []
        for (let i = 0; i < detalles.length; i++) {
            const response = await db.one(`INSERT INTO public.cp_detalle(id_cabecera, cantidad_a_pagar, fcom_id, saldo)
                    VALUES ( $1, $2, $3, $4) returning* ;`, [cabecera.id_cabecera, detalles[i].cantidad_a_pagar, detalles[i].fcom_id, detalles[i].saldo])
            detalle.push(response)
        }
        cabecera.cab_detalle = detalle
        res.json(cabecera)

    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }
}

const getAllFacturasbyProveedor = async (req, res) => {

    try {

        const { cedula_ruc } = req.params

        const facturas = await db.any(`SELECT cf.fcom_id, cf.pro_cedula_ruc, cf.fcom_credito_contado, 
        cf.fcom_fecha, cf.fcom_fechavencimiento, cf.fcom_total FROM cp_factura cf INNER JOIN
        cp_proveedor cp ON cp.prov_cedula_ruc = cf.pro_cedula_ruc WHERE cf.fcom_credito_contado= true  
        and cf.pro_cedula_ruc = $1`, [cedula_ruc]);
        res.json(facturas)
    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }

}

const getFacturas = async (req, res) => {
    try {
        const facturas = await db.any(`SELECT*FROM cp_factura;`);
        res.json(facturas)
    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }
}

const getFacturabyid = async (req, res) => {
    try {
        const { id } = req.params
        const facturas = await db.any(`SELECT * FROM cp_factura WHERE fcom_id = $1;`, [id]);
        res.json(facturas)
    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }
}

module.exports = {
    getPagos,
    getAllPagoDetalles,
    getPago,
    createPagoDetalle,
    getFacturas,
    getAllFacturasbyProveedor,
    getFacturabyid
}