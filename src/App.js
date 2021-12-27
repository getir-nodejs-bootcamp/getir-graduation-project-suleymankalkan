const express = require('express');

const app = express();
const { RecordRoutes } = require('./routes');
const config = require('./config');
const loaders = require('./loaders');
const { logError, returnError } = require('./middlewares/errorHandler');
const Api404Error = require('./errors/api404Error');

config();
loaders();

app.use(express.json());

app.use('/records', RecordRoutes);

app.use('*', () => {
  throw new Api404Error();
});

app.use(logError);
app.use(returnError);

app.listen(process.env.SERV_PORT, () => {
  console.log(`Server started on port ${process.env.SERV_PORT}`);
});
