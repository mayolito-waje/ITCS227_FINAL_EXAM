const express = require('express');
const { protect } = require('../utils/middleware');
const {
  createProducts,
  retrieveActiveProducts,
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter.post('/', protect, createProducts);
productRouter.get('/', protect, retrieveActiveProducts);

module.exports = productRouter;
