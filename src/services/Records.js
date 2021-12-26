const Record = require('../models/Record');

const list = () => Record.find({});

module.exports = { list };
