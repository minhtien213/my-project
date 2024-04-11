const express = require('express');
const router = express.Router();
const CommentController = require('../app/controllers/CommentController');
const { authMiddleware, authUserMiddleware } = require('../app/middlewares/authMiddleware');

router.post('/create-comment/:id', CommentController.createComment);
router.get('/get-comment/:id', CommentController.getComment);
router.delete('/remove-comment/:id/:commentId', CommentController.removeComment);

module.exports = router;
