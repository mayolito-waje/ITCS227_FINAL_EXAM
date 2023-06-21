const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

const retrieveOrders = async (req, res, next) => {
  const orders = req.user.isAdmin
    ? await Order.find({})
    : await Order.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
        { $project: { userId: 0, _id: 0, __v: 0 } },
      ]);

  res.json(await Order.populate(orders, { path: 'userId products' }));
};

const createOrder = async (req, res, next) => {
  if (req.user.isAdmin) {
    const err = new Error('only non-admins can create orders');
    err.status = 401;
    return next(err);
  }

  const userId = req.user.id;
  let totalAmount = 0;

  try {
    const productOrders = await Promise.all(
      req.body.map(async (productId) => {
        const product = await Product.findById(productId);
        totalAmount += product.price;
        return new mongoose.Types.ObjectId(productId);
      })
    );

    const order = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      products: productOrders,
      totalAmount,
    });

    await order.save();
    const createdOrder = await Order.populate(order, { path: 'products' });

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  const userId = req.user.id;
  const orderId = req.params.id;

  try {
    const orderToDelete = await Order.findById(orderId);
    if (!orderToDelete) {
      const err = new Error("order doesn't exist");
      err.status = 400;
      return next(err);
    }

    if (orderToDelete.userId.toString() === userId) {
      await orderToDelete.deleteOne();
      res.json({
        message: 'successfully deleted',
      });
    } else {
      res.status(401).json({
        message: 'you have no permission to delete this order',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  retrieveOrders,
  createOrder,
  deleteOrder,
};
