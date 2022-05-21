const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please enter your name',
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: 'Please enter your email',
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  timeStamp: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("users", schema);
