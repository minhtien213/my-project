const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');
const { authMiddleware, authUserMiddleware } = require('../app/middlewares/authMiddleware');

router.post('/create-order/:id', authUserMiddleware, orderController.createOrder);

// router.put('/update-order/:id', authUserMiddleware, orderController.updateOrder);

// router.delete('/remove-order/:id', authUserMiddleware, orderController.removeOrder);

// router.get('/get-all', authMiddleware, orderController.getAllOrders);
// router.get('/get-detail/:id', authUserMiddleware, orderController.getDetailOrder);

module.exports = router;
