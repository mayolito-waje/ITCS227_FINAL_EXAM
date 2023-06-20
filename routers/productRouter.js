const express = require('express');
const { protect } = require('../utils/middleware');
const {
  createProducts,
  retrieveActiveProducts,
  retrieveSingleProduct,
  updateProduct,
  archiveProduct,
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter.put('/:id/archive', protect, archiveProduct);
productRouter.get('/:id', protect, retrieveSingleProduct);
productRouter.put('/:id', protect, updateProduct);
productRouter.post('/', protect, createProducts);
productRouter.get('/', protect, retrieveActiveProducts);

module.exports = productRouter;
