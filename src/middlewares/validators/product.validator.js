const Joi = require('joi');
const { ResponseError } = require('../../errors');
const sendResponse = require('../../utils/sendResponse');

const productValidator = {
    getProduct: (req, res, next) => {
        try {
            const schema = Joi.object({
                itemName: Joi.string().min(5).allow(''),
                quantity: Joi.number().integer().min(1).allow(''),
                totalCost: Joi.number().integer().min(0).allow(''),
                totalPrice: Joi.number().integer().min(0).allow('')
            })
            const result = schema.validate(req.query);
            if (result.error) throw new ResponseError(result.error?.message, 400);
            next();

        } catch (error) {
            sendResponse({ res, error });
        }
    },
    getProductById: (req, res, next) => {
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
    createNewProduct: (req, res, next) => {
        try {
            const schemaBody = Joi.object({
                itemName: Joi.string().min(5).required().allow(''),
                quantity: Joi.number().min(1).required().allow(''),
                totalCost: Joi.number().integer().min(0).required().allow(''),
                totalPrice: Joi.number().integer().min(0).required().allow('')
            })
            const resultBody = schemaBody.validate(req.body);
            if (resultBody.error)
                throw new ResponseError(resultBody.error?.message, 400);
            next()
        } catch (error) {
            sendResponse({ res, error });
        }
    },
    updateProductById: (req, res, next) => {
        try {
            const schemaBody = Joi.object({
                itemName: Joi.string().min(5),
                quantity: Joi.number().min(1),
                totalCost: Joi.number().integer().min(0),
                totalPrice: Joi.number().integer().min(0)
            })
            const resultBody = schemaBody.validate(req.body);
            if (resultBody.error)
                throw new ResponseError(resultBody.error?.message, 400);
            next()
          } catch (error) {
            sendResponse({ res, error });
          }
    },
    deleteProductById: (req, res, next) => {
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
module.exports =productValidator