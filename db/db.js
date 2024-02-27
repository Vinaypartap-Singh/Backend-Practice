const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      "mongodb+srv://vinay:vinay@backendlearning.ezg9dza.mongodb.net/users"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB connection failed ", error);
  }
};

module.exports = connectDB;
