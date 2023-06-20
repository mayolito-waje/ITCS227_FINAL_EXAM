const express = require('express');
const mongoose = require('mongoose'); // MongoDB Object Document Mapper
const cors = require('cors');
const helmet = require('helmet');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
require('express-async-errors');

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((e) => {
    console.error('Error connecting to MongoDB: ', e);
  });

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use(middleware.unknownResource);
app.use(middleware.errorHandler);

module.exports = app;
