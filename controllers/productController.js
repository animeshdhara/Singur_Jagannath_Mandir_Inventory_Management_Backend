const Product = require('../models/Product');


// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// Get Product by Barcode
exports.getProductByBarcode = async (req, res) => {
  try {
    const { barcode } = req.params;

    const product = await Product.findOne({ barcode });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        product: null
      });
    }

    res.json({
      success: true,
      message: "Product found successfully!",
      product
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { barcode } = req.body;

    const existingProduct = await Product.findOne({ barcode });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product already exists with this barcode.'
      });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Server error while adding product'
    });
  }
};


// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json(updatedProduct);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
};


// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Server error while deleting product'
    });
  }
};