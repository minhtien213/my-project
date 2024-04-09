const Comment = require('../models/CommentModel');
const moment = require('moment');

//[POST] comment/create-comment/:id
const createComment = (newComment) => {
  console.log(newComment);
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

module.exports = {
  createComment,
};
