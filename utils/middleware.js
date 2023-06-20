const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const extractToken = (req, res, next) => {
  const auth = req.get('authorization');

  if (auth.toLowerCase().startsWith('bearer')) {
    const token = auth.substring(7);
    req.token = token;
  }

  next();
};

const protect = (req, res, next) => {
  const { token } = req;
  if (!token) {
    const err = new Error('token is missing');
    err.status = 401;
    return next(err);
  }

  const decodedToken = jwt.verify(token, config.SECRET);

  req.user = decodedToken;
  next();
};

const unknownResource = (req, res) => {
  res.status(404).json({
    message: 'Resource Not Found',
  });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    });
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    });
  } else if (err.message.includes('duplicate key error collection')) {
    return res
      .status(400)
      .json({ error: 'email should be unique (email is already taken)' });
  }

  const status = err.status === 200 ? 500 : err.status;

  res.status(status).json({
    error: err.message,
  });
};

module.exports = {
  unknownResource,
  errorHandler,
};
