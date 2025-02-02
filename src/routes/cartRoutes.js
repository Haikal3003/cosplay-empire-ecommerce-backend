const express = require('express');
const { isAuthenticated } = require('../middlewares/jwtMiddleware');
const { getAllProductsInCart, addProductToCart, removeProductFromCart, clearProductFromCart, updateCartItem } = require('../controllers/cartController');

const router = express.Router();

router.get('/', isAuthenticated, getAllProductsInCart);
router.post('/add', isAuthenticated, addProductToCart);
router.delete('/:id', isAuthenticated, removeProductFromCart);
router.delete('/clear', isAuthenticated, clearProductFromCart);
router.put('/', isAuthenticated, updateCartItem);

module.exports = router;
