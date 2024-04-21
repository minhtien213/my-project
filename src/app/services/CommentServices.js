const Comment = require('../models/CommentModel');
const moment = require('moment');

//[POST] comment/create-comment/:id
const createComment = (newComment) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdComment = await Comment.create({
        ...newComment,
        addedAt: moment().format('DD/MM/YYYY'),
      });
      if (createdComment) {
        resolve({
          status: 'OK',
          message: 'Đăng bình luận thành công!',
          data: createdComment,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//[GET]  comment/get-comment/:id
const getComment = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comments = await Comment.find({ productId })
        .populate('userId')
        .sort({ createdAt: 'desc' });
      if (comments) {
        resolve({
          status: 'OK',
          message: 'Success',
          data: comments,
        });
      }
    } catch (error) {
      return reject({ status: 'ERR', message: 'Có lỗi khi lấy comments' });
    }
  });
};

//[DELETE]  comment/remove-comment/:id/:commentId
const removeComment = (commentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const removedComments = await Comment.findByIdAndDelete(commentId, { new: true });
      if (removedComments) {
        resolve({
          status: 'OK',
          message: 'Đã xóa comment',
          data: removedComments,
        });
      }
    } catch (error) {
      return reject({ status: 'ERR', message: 'Có lỗi khi xóa comment' });
    }
  });
};

module.exports = {
  createComment,
  getComment,
  removeComment,
};
