const express = require('express');
const { protect } = require('../utils/middleware');
const {
  createProducts,
  retrieveActiveProducts,
  retrieveSingleProduct,
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/:id', protect, retrieveSingleProduct);
productRouter.post('/', protect, createProducts);
productRouter.get('/', protect, retrieveActiveProducts);

module.exports = productRouter;
