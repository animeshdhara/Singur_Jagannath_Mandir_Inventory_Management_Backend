const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { barcode } = req.params;
    const product = await Product.findOne({ barcode });

    if (!product) return res.status(404).json({success:false, message: "Product not found", product:null });
    res.json({success:true, message:"Product found successfully!", product});
  } catch (err) {
    res.status(500).json({success:false, error: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { barcode } = req.body;

    const existingProduct = await Product.findOne({ barcode });

    if (existingProduct) {
      return res.status(400).json({success:false, message: 'Product already exists with this barcode.' });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({success: true, product});
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: 'Server error while adding product' });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const updateData = req.body; 
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,       
      runValidators: true, 
    });

    if (!updatedProduct) {
      return res.status(404).json({success:false, message: 'Product not found' });
    }

    res.json({success:true, updatedProduct});
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: 'Error updating product' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({success:false, message: 'Product not found' });
    }

    res.json({success:true, message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: 'Server error while deleting product' });
  }
};
