const express = require('express');
const { getAllProducts, getProductById, getProductByCategory, createProduct, updateProductById, deleteProductById } = require('../controllers/productController');
const { uploadPhotoMiddleware } = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/products/category/:category', getProductByCategory);
router.post('/products', uploadPhotoMiddleware, createProduct);
router.put('/products/:id', uploadPhotoMiddleware, updateProductById);
router.delete('/products/:id', deleteProductById);

module.exports = router;
