const { connectDB } = require('./mongodb');

module.exports = async () => {
  await connectDB();
};
