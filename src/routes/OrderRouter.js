const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');
const { authMiddleware, authUserMiddleware } = require('../app/middlewares/authMiddleware');

router.post('/create-order/:id', authUserMiddleware, orderController.createOrder);

router.get('/get-my-orders/:id', authUserMiddleware, orderController.getMyOrders);

module.exports = router;
