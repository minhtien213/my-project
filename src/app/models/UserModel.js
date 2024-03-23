const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    password: { type: String, required: true },
    isAdmin: { type: 'boolean', default: false, required: true },
    phone: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    images: [{ type: String, default: '' }],
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
