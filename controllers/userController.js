const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../utils/config');

const registerUser = async (req, res, next) => {
  const { email, password, isAdmin } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new Error('Email should be unique');
    err.status = 400;
    return next(err);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    email,
    password: passwordHash,
    isAdmin,
  });

  const savedUser = await user.save();

  const token = jwt.sign({ id: user._id }, config.SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  res.status(201).json({
    token,
    id: savedUser.id,
    email: savedUser.email,
    isAdmin: savedUser.isAdmin,
  });
};

module.exports = {
  registerUser,
};
