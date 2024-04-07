const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    listOrder: [
      {
        // productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        productId: { type: Object, required: true },
        color: { type: String, required: true },
        memory: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    shippingInfo: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },

    note: { type: String, default: '' },
    discount: { type: Number, default: 0 },
    deliveryCharges: { type: Number, required: true },
    taxPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true },

    paymentMethod: {
      type: String,
      required: true,
      enum: ['Cash', 'Credit Card', 'PayPal'],
      default: 'Cash',
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  },
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
