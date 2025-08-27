
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ productId: String, name: String, price: Number, qty: Number }],
  total: Number,
  customer: { name: String, email: String },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
