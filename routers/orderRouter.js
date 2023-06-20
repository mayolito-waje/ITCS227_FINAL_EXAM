const express = require('express');
const { protect } = require('../utils/middleware');
const {
  retrieveOrders,
  createOrder,
} = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.get('/', protect, retrieveOrders);
orderRouter.post('/', protect, createOrder);

module.exports = orderRouter;
