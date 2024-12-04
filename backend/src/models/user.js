const mongoose = require('mongoose');

// Định nghĩa schema cho user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  }
});

// Tạo model từ schema
const User = mongoose.model('User', userSchema);

module.exports = User;
