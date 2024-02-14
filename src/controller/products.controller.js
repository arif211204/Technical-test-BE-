const { Product } = require('../models');
const sendResponse = require('../utils/sendResponse');
const { ResponseError } = require('../errors');

const productController = {
    getAllProduct: async (req, res) => {
        try {
            await Product.findAll()
            sendResponse({res, statusCode:200})
        } catch (error) {
            sendResponse({res, error})

        }
    },
    getProductById: async (req, res) => {
        try {
            const data = await Product.findByPk(req.params.id)
            if (!data) throw new ResponseError('product not found', 404)
            sendResponse({res, statusCode:200})
        } catch (error) {
            sendResponse({res, error})

        }
    },
    createNewProduct: async (req, res) => {
        try {
            const data = { ...req.body }
            await Product.create(data)
            sendResponse({res, statusCode:200})
        } catch (error) {
            sendResponse({res, error})
        }
    },
    updateProduct: async () => {
        try {
            const [data] = await Product.update(req.body, { id: req.params.id })
            if (data === 0) throw ResponseError('product not found', 404)
            sendResponse({res,statusCode:200})
        } catch (error) {
            sendResponse({res, error})
        }
    },
    deletedProduct: async (req, res) => {
        try {
            const data = await Product.destroy(req.params.id)
            if (!data) throw new ResponseError('product not found', 404)
            sendResponse({res, statusCode:200})
        } catch (error) {
            sendResponse({res, error})
        }
    }
}
module.exports = productController