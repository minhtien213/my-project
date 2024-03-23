const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    images: [{ type: String, required: true }],
    type: { type: String, required: true, default: '' },
    color: { type: String, required: true },
    memory: { type: String, required: true, default: '' },
    brand: { type: String, required: true, default: '' },
    price: { type: Number, required: true, default: '' },
    quantity: { type: Number, required: true, default: '' },
    rating: { type: Number, required: true, default: '' },
    description: { type: String, required: true, default: '' },
  },
  {
    timestamps: true,
  },
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
