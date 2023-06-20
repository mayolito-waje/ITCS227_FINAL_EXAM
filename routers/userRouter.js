const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const orderRouter = require('./orderRouter');

const userRouter = express.Router();

userRouter.use('/orders', orderRouter);

userRouter.post('/login', loginUser);
userRouter.post('/', registerUser);

module.exports = userRouter;
