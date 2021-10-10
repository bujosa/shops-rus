const mongoose = require("mongoose");
const DataBaseConnectionError = require("./errors/DataBaseConnectionError");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new DataBaseConnectionError();
  }
};

module.exports = { dbConnection };
