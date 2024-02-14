const express = require('express')
const productController = require('../controller/products.controller')
const productValidator = require('../middlewares/validators/product.validator')
const routes = express.Router()

routes.get('/',productValidator.getProduct, productController.getAllProduct)
routes.get('/:id',productValidator.getProductById, productController.getProductById)
routes.post('/',productValidator.createNewProduct, productController.createNewProduct)
routes.patch('/:id',productValidator.updateProductById, productController.updateProduct)
routes.delete('/:id',productValidator.deleteProductById, productController.deletedProduct)

module.exports = routes;
