const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: 'boolean', default: false, required: true },
    phone: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: '' },
    address: { type: String, default: '' },
    access_token: { type: String },
    refresh_token: { type: String },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model('User', userSchema);
module.exports = User;
