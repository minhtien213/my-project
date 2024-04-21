const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

//plugin
mongoose.plugin(slug);

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    // images: [{ type: String, required: true }],
    type: { type: String, required: true, default: '' },
    colors: [{ type: String, required: true }],
    memorys: [{ type: String, required: true }],
    prices: { type: Object, required: true },
    brand: { type: String, required: true, default: '' },
    quantity: { type: Number, required: true, default: '' },
    rating: { type: Number, required: true, default: '' },
    description: { type: String, required: true, default: '' },
    slug: { type: String, slug: 'name' },
  },
  {
    timestamps: true,
  },
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
