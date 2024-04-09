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

module.exports = {
  createComment,
};
