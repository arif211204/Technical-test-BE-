const { Invoice } = require('../models');
const sendResponse = require('../utils/sendResponse');
const { ResponseError } = require('../errors');


const invoiceController = {
    getInvoice: async (req, res) => {
        try {
        const data = await Invoice.findAll()
            sendResponse({res, statusCode:200, data:data})
        } catch (error) {
            sendResponse({res,error})
            
        }
    },
    getInvoiceById: async (req, res) => {
        try {
            const data = await Invoice.findByPk(req.params.id)
            if (!data) throw new ResponseError('invoice not found', 404)
            sendResponse({res,statusCode:200,data:data})
        } catch (error) {
            sendResponse({res,error})

        }
    },
    createInvoice: async (req, res) => {
        try {
            const data = { ...req.body }
            const newInvoices = await Invoice.create(data)
            sendResponse({res,statusCode:200,data:newInvoices})
        } catch (error) {
            sendResponse({res,error})
        }
    },
    editInvoice: async (req, res) => {
        try {
            const [data] = await Invoice.update(req.body, { where: { id: req.params.id }})
            if (data === 0) throw ResponseError('invoice not found', 404)
            sendResponse({res,statusCode:200})
        } catch (error) {
            sendResponse({res, error})
        }
    },
    deletedInvoiceById:  (req, res) => {
        try {
            const data =  Invoice.destroy({where :{id:req.params.id}})
             if (data === 0) throw new ResponseError('invoice not found', 404)
        } catch (error) {
            sendResponse({ res, error });
        }
    }
}
module.exports = invoiceController;
