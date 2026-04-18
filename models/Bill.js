const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customerName: {
    type: String
  },

  customerPhone: {
    type: String
  },

  items: [
    {
      _id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
      },
      name: String,
      barcode: String,
      price: Number,
      quantity: Number,
      total: Number
    }
  ],

  subtotal: Number,
  gst: Number,
  total: Number,

  paymentMethod: {
    type: String,
    default: "cash"
  },

  date: { 
    type: Date, 
    default: Date.now 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Bill', billSchema);