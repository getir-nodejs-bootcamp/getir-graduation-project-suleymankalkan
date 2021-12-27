const express = require('express');
const { RecordRoutes } = require('./routes');
const config = require('./config');
const loaders = require('./loaders');
const { returnError } = require('./middlewares/errorHandler');
const Api404Error = require('./errors/api404Error');

const app = express();

config();

// Start to listen after db connection
loaders().then(() => {
  app.listen(process.env.SERV_PORT, () => {
    console.log(`Server started on port ${process.env.SERV_PORT}`);
  });
});

app.use(express.json());

app.use('/records', RecordRoutes);

app.use('*', () => {
  throw new Api404Error();
});

app.use(returnError);

module.exports = app;
