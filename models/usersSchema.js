const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userName: {
    type: String,
    required: 'Please enter your name',
    trim: true
  },
  userEmail: {
    type: String,
    unique: true,
    required: 'Please enter your email',
    trim: true,
    lowercase: true,
  },
  userPassword: {
    type: String,
    required: true
  },
  userPhoneNumber: {
    type: String
  },
  timeStamp: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("users", schema);
