const express = require('express');
const router = express.Router();
const CommentController = require('../app/controllers/CommentController');
const { authMiddleware, authUserMiddleware } = require('../app/middlewares/authMiddleware');

router.post('/create-comment/:id', CommentController.createComment);

module.exports = router;
