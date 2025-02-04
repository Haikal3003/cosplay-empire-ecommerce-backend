const express = require('express');
const { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

module.exports = router;
