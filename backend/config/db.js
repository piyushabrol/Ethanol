const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://abrolpiyush05:abrolpiyush@cluster0.sio9yrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
