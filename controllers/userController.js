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

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    config.SECRET,
    {
      expiresIn: 60 * 60 * 24 * 30,
    }
  );

  res.status(201).json({
    token,
    id: savedUser.id,
    email: savedUser.email,
    isAdmin: savedUser.isAdmin,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const correctPassword =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    return res.status(401).json({
      error: 'invalid email or password',
    });
  }

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    config.SECRET,
    {
      expiresIn: 60 * 60 * 24 * 30,
    }
  );

  res.status(200).send({
    token,
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

module.exports = {
  registerUser,
  loginUser,
};
