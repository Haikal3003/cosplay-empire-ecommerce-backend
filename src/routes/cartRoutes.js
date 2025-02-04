const express = require('express');
const { getAllProductsInCart, addProductToCart, removeProductFromCart, clearProductFromCart, updateCartItem, incrementCartItem, decrementCartItem } = require('../controllers/cartController');

const router = express.Router();

router.get('/', getAllProductsInCart);
router.post('/add', addProductToCart);
router.delete('/:id', removeProductFromCart);
router.delete('/clear', clearProductFromCart);
router.put('/', updateCartItem);
router.put('/increment', incrementCartItem);
router.put('/decrement', decrementCartItem);

module.exports = router;
