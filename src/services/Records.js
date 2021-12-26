const Record = require('../models/Record');

const list = () => {
  return Record.find({});
};

module.exports = { list };