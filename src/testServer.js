const express = require('express');
const { RecordRoutes } = require('./routes');
const config = require('./config');
const loaders = require('./loaders');
const { returnError } = require('./middlewares/errorHandler');
const Api404Error = require('./errors/api404Error');

const app = express();

config();
loaders();

app.use(express.json());

app.use('/records', RecordRoutes);

app.use('*', () => {
  throw new Api404Error();
});

app.use(returnError);

module.exports = app;
