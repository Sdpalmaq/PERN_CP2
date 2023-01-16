const { Router } = require("express")
const { getAllPago, getPago, createPagoDetalle, getFacturas, getAllFacturasbyProveedor, getFacturabyid, getAllPagoDetalles, getPagos
} = require('../controllers/pagos.controller')



const router = Router();

router.get('/pagos', getAllPagoDetalles)

router.get('/pago', getPagos)

router.get('/pago/:id_cabecera', getPago)

router.post('/pago', createPagoDetalle)

router.get('/facturas/', getFacturas)

router.get('/facturas/:cedula_ruc', getAllFacturasbyProveedor)

router.get('/factura/:id', getFacturabyid)


module.exports = router;