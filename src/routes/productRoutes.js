const express = require('express');
const { isAuthenticated } = require('../middlewares/jwtMiddleware');
const { getAllProducts, getProductById, getProductByCategory, createProduct, updateProductById, deleteProductById } = require('../controllers/productController');

const router = express.Router();

router.get('/', isAuthenticated, getAllProducts);
router.get('/:id', isAuthenticated, getProductById);
router.get('/category/:category', isAuthenticated, getProductByCategory);
router.post('/', isAuthenticated, createProduct);
router.put('/:id', isAuthenticated, updateProductById);
router.delete('/:id', isAuthenticated, deleteProductById);

module.exports = router;
