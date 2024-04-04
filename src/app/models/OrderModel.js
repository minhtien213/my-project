const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    listOrder: [
      {
        productId: { type: Object, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    shippingInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },

    taxPrice: { type: Number, required: true, default: 0 },
    deliveryCharges: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    discount: { type: String, default: 0 },
    note: { type: String, default: '' },

    paymentMethod: { type: String, required: true, default: 'Tiền mặt' },
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
