const Mongoose = require('mongoose');

const db = Mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB successfully.');
});

const connectDB = async () => {
  const { DB_URL } = process.env;
  try {
    await Mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDB,
};
