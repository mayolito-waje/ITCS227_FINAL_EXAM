const express = require('express');
const { protect } = require('../utils/middleware');
const {
  retrieveOrders,
  createOrder,
  deleteOrder,
} = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.delete('/:id', protect, deleteOrder);
orderRouter.get('/', protect, retrieveOrders);
orderRouter.post('/', protect, createOrder);

module.exports = orderRouter;
