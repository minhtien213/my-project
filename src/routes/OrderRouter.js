const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');
const { authMiddleware, authUserMiddleware } = require('../app/middlewares/authMiddleware');

router.post('/create-order/:id', orderController.createOrder);

router.get('/get-my-orders/:id', orderController.getMyOrders);

module.exports = router;
