const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const { authMiddleware, authUserMiddleware } = require('../app/middlewares/authMiddleware');

router.post('/create/:id', authMiddleware, productController.createProduct);
router.put('/update/:id', authMiddleware, productController.updateProduct);
router.delete('/delete/:id/:itemId', authMiddleware, productController.deleteProduct);
router.delete('/delete-many/:id/:listItemIds', authMiddleware, productController.deleteManyProducts);
router.get('/get-all', productController.getAllProducts);
router.get('/filter', productController.filterProducts);
router.get('/get-detail/:name', productController.getDetailProduct);

module.exports = router;
