const express = require('express');
const { protect } = require('../utils/middleware');
const {
  retrieveOrders,
  retrieveSingleOrder,
  createOrder,
  deleteOrder,
} = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.get('/:id', protect, retrieveSingleOrder);
orderRouter.delete('/:id', protect, deleteOrder);
orderRouter.get('/', protect, retrieveOrders);
orderRouter.post('/', protect, createOrder);

module.exports = orderRouter;
