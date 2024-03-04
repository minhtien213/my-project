const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const { authMiddleware, authUserMiddleware } = require('../app/middlewares/authMiddleware');

router.post('/create', productController.createProduct);
router.put('/update-product/:id', productController.updateProduct);
router.delete('/delete-product/:id', authMiddleware, productController.deleteProduct);
router.get('/get-all-products', authMiddleware, productController.getAllProducts);
router.get('/get-detail-product/:id', authUserMiddleware, productController.getDetailProduct);

module.exports = router;
