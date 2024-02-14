const Joi = require('joi');
const { ResponseError } = require('../../errors');
const sendResponse = require('../../utils/sendResponse');

const invoiceValidator = {
    getInvoice: (req, res, next) => {
        try {
            const schema = Joi.object({
                invoiceNo: Joi.string().min(1),
                date: Joi.date(),
                customerName: Joi.string().min(2),
                salesPersonName: Joi.string().min(2),
                paymentType: Joi.string().valid('CASH', 'CREDIT'),
                notes: Joi.string().min(5),
            });
            
            const validationResult = schema.validate(req.body);
            if (validationResult.error) {
                throw validationResult.error;
            }

            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getInvoiceById: (req, res, next) => {
        try {
            const schema = Joi.object({
              id: Joi.number().integer().min(1).required(),
            }).required();
      
            const result = schema.validate(req.params);
      
            if (result.error) throw new ResponseError(result.error?.message, 400);
      
            next();
          } catch (error) {
            sendResponse({ res, error });
          }
    },
    createNewInvoice: (req, res, next) => {
        try {
            const schemaBody = Joi.object({
                invoiceNo: Joi.string().min(1).required(),
                date: Joi.date().required(),
                customerName: Joi.string().min(2).required(),
                salesPersonName: Joi.string().min(2).required(),
                paymentType: Joi.string().valid('CASH', 'CREDIT').required(),
                notes: Joi.string().min(5).required(),
            })
            const resultBody = schemaBody.validate(req.body);
            if (resultBody.error)
                throw new ResponseError(resultBody.error?.message, 400);
            next()
        } catch (error) {
            sendResponse({ res, error });
        }
    },
    updateInvoiceById: (req, res, next) => {
        try {
            const schemaBody = Joi.object({
                invoiceNo: Joi.string().min(1),
                date: Joi.date(),
                customerName: Joi.string().min(2),
                salesPersonName: Joi.string().min(2),
                paymentType: Joi.string().valid('CASH', 'CREDIT'),
                notes: Joi.string().min(5).optional(),
            })
            const resultBody = schemaBody.validate(req.body);
            if (resultBody.error)
                throw new ResponseError(resultBody.error?.message, 400);
            next()
          } catch (error) {
            sendResponse({ res, error });
          }
    },
    deleteInvoiceById: (req, res, next) => {
        try {
            const schema = Joi.object({
              id: Joi.number().integer().min(1).required(),
            }).required();
      
            const result = schema.validate(req.params);
      
            if (result.error) throw new ResponseError(result.error?.message, 400);
      
            next();
          } catch (error) {
            sendResponse({ res, error });
          }
    },
}
module.exports =invoiceValidator