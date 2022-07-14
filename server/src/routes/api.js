const express = require('express');
const productsRouter = require('./api/products/products.router');

const api = express.Router()

api.use('/products', productsRouter);

module.exports = api;