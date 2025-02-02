const express = require('express');
const { getAllProducts, getProductById, getProductByCategory, createProduct, updateProductById, deleteProductById } = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/:category', getProductByCategory);
router.post('/', createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

module.exports = router;
