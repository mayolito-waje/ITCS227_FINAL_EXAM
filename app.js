const express = require('express');
const mongoose = require('mongoose'); // MongoDB Object Document Mapper
const cors = require('cors');
const helmet = require('helmet');
const config = require('./utils/config');

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

module.exports = app;
