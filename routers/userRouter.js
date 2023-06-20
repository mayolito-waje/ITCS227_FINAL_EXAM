const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/', registerUser);

module.exports = userRouter;
