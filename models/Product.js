const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  barcode: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  price: String,
  stock: String,
});

module.exports = mongoose.model('Product', productSchema);
