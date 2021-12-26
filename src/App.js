const express = require('express');
const app = express();
const { RecordRoutes } = require("./routes");
const config = require("./config");
const loaders = require("./loaders");


config();
loaders();

app.use(express.json());

app.use("/records", RecordRoutes);

app.listen(process.env.SERV_PORT, () => {
  console.log(`Server started on port ${process.env.SERV_PORT}`);
});