const express = require('express');
const { httpGetAllProducts, httpGetProduct, httpCreateProduct, httpDeleteProduct, httpUpdateProduct } = require('./products.controller');

const productsRouter = express.Router();

productsRouter.get('/', httpGetAllProducts);
productsRouter.get('/:id', httpGetProduct);
productsRouter.put('/:id', httpUpdateProduct);
productsRouter.post('/', httpCreateProduct);
productsRouter.delete('/:id', httpDeleteProduct);

module.exports = productsRouter;