const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, 
    }
   
  },
  {
    timestamps: true, // Thêm trường createdAt và updatedAt tự động
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
