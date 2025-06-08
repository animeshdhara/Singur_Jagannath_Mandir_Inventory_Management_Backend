const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);
