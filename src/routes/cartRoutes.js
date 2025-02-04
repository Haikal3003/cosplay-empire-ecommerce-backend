const express = require('express');
const { getAllProductsInCart, addProductToCart, removeProductFromCart, clearProductFromCart, updateCartItem, incrementCartItem, decrementCartItem } = require('../controllers/cartController');

const router = express.Router();

router.get('/cart', getAllProductsInCart);
router.post('/cart/add', addProductToCart);
router.delete('/cart/item/:id', removeProductFromCart);
router.delete('/cart/clear', clearProductFromCart);
router.put('/cart/', updateCartItem);
router.put('/cart/increment', incrementCartItem);
router.put('/cart/decrement', decrementCartItem);

module.exports = router;
