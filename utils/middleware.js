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
