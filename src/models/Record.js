const Mongoose = require("mongoose");

const RecordSchema = new Mongoose.Schema({ 
  key: String,
  createdAt: Date,
  counts: [Number],
  value: String,
});

const RecordModel = Mongoose.model('records', RecordSchema);

module.exports = RecordModel;