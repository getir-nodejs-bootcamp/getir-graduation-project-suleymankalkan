const express = require('express');
const app = express();
const config = require("./config");
const loaders = require("./loaders");

config();
loaders();

app.use(express.json());

app.listen(process.env.SERV_PORT, () => {
  console.log(`Server started on port ${process.env.SERV_PORT}`);
});