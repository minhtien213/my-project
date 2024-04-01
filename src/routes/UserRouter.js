const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const upload = require('../utils/multer');
const { authMiddleware, authUserMiddleware } = require('../app/middlewares/authMiddleware');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);

router.put('/update-user/:id', authUserMiddleware, userController.updateUser);
router.put('/update-avatar/:id', upload, userController.updateAvatar);
router.put('/change-password/:id', authUserMiddleware, userController.changePassword);
router.put('/reset-password', userController.resetPassword);
router.put('/add-cart', authUserMiddleware, userController.addCart);

router.delete('/remove-cart', userController.removeCartItem);
router.delete('/delete-user/:id', userController.deleteUser);

router.get('/get-all', authMiddleware, userController.getAllUsers);
router.get('/get-detail/:id', authUserMiddleware, userController.getDetailUser);

module.exports = router;
