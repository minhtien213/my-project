const CommentServices = require('../services/CommentServices');
const Comment = require('../models/CommentModel');

//[POST] comment/create-comment/:id
const createComment = async (req, res) => {
  const { userId, productId, content } = req.body;
  try {
    if (!productId || !userId || !content) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Các trường không được để trống',
      });
    }
    const response = await CommentServices.createComment(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[GET]  comment/get-comment/:id
const getComment = async (req, res) => {
  const productId = req.params.id;
  try {
    if (!productId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Invalid product ID',
      });
    }
    const response = await CommentServices.getComment(productId);
    res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: '404 Not Found',
    });
  }
};

//[DELETE]  comment/remove-comment/:id/:commentId
const removeComment = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    if (!commentId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Invalid comment ID',
      });
    }
    const response = await CommentServices.removeComment(commentId);
    res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: 'ERR',
      message: '404 Not Found',
    });
  }
};

module.exports = {
  createComment,
  getComment,
  removeComment,
};
