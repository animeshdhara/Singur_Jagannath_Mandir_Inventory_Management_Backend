const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.get(`/getProduct/:barcode`, getProducts);
router.post('/addProduct', addProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;
