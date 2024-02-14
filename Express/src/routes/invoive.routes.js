const express = require('express')
const invoiceController = require('../controller/invoices.Controller')
const { invoiceValidator } = require('../middlewares/validators')

const routes = express.Router()

routes.get('/',invoiceValidator.getInvoice, invoiceController.getInvoice)
routes.get('/:id',invoiceValidator.getInvoiceById, invoiceController.getInvoiceById)
routes.post('/',invoiceValidator.createNewInvoice, invoiceController.createInvoice)
routes.patch('/:id',invoiceValidator.updateInvoiceById, invoiceController.editInvoice)
routes.delete('/:id',invoiceValidator.deleteInvoiceById, invoiceController.deletedInvoiceById)

module.exports = routes;
