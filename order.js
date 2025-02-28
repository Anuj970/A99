const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{ type: String, ref: 'Product' }],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);