const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
};

exports.addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndDelete()
  res.json({"message":"Product deleted successfully"});
};
