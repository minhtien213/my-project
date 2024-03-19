const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const { createAccessToken, createRefreshToken } = require('./jwtServices');

//[POST] /sign-up
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password } = newUser;

    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser !== null) {
        resolve({
          status: 'ERR',
          message: 'Email đã tồn tại trong hệ thống',
        });
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hashPassword,
      });
      if (createdUser) {
        resolve({
          status: 'OK',
          message: 'Đăng kí thành công!',
          data: createdUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//[POST] /sign-in
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;

    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser === null) {
        //check user is existing
        resolve({
          status: 'ERR',
          message: 'Tài khoản không tồn tại',
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        //check password is correct
        resolve({
          status: 'ERR',
          message: 'Tài khoản hoặc mật khẩu không chính xác',
        });
      }
      const access_token = await createAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      const refreshToken = await createRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        //OK? => return data
        status: 'OK',
        message: 'Success',
        access_token,
        refreshToken,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//[PUT] /update-user/:id
const updateUser = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findById(userId);
      if (checkUser === null) {
        //check user is existing
        resolve({
          status: 'OK',
          message: 'Tài khoản không tồn tại',
        });
      }
      const userUpdated = await User.findByIdAndUpdate(userId, data, { new: true });
      resolve({
        status: 'OK',
        message: 'Cập nhật thông tin thành công',
        data: userUpdated,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//[PUT] update-avatar/:id
const updateAvatar = (userId, file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const avatar_updated = await User.findByIdAndUpdate(userId, { images: file }, { new: true });
      if (avatar_updated) {
        resolve({
          status: 'OK',
          message: 'Cập nhật ảnh thành công',
          data: avatar_updated,
        });
      } else {
        resolve({
          status: 'ERR',
          message: 'Không thành công, vui lòng thử lại',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//[PUT] /change-password/:id
const changePassword = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findById(userId);
      if (checkUser === null) {
        //check user is existing
        resolve({
          status: 'ERR',
          message: 'Tài khoản không tồn tại',
        });
      }

      const comparePassword = bcrypt.compareSync(data.password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: 'ERR',
          message: 'Mật khẩu cũ không chính xác',
        });
      } else {
        const hashPassword = bcrypt.hashSync(data.newPassword, 10);
        const pass_update = await User.findByIdAndUpdate(
          userId,
          { password: hashPassword },
          {
            new: true,
          },
        );
        if (pass_update) {
          resolve({
            //OK? => return data
            status: 'OK',
            message: 'Thay đổi mật khẩu thành công',
            data: pass_update,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

//[PUT] /reset-password
const resetPassword = (data) => {
  const { email, newPassword } = data;
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = bcrypt.hashSync(newPassword, 10);
      const userUpdated = await User.findOneAndUpdate(
        { email: email },
        { password: hashPassword },
        {
          new: true,
        },
      );
      resolve({
        //OK? => return data
        status: 'OK',
        message: 'Khôi phục mật khẩu thành công',
        data: userUpdated,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//[DELETE] /delete-user/:id
const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findById(userId);
      if (checkUser === null) {
        //check user is existing
        resolve({
          status: 'OK',
          message: 'The user is not exist',
        });
      }
      await User.findByIdAndDelete({ _id: userId });
      resolve({
        //OK? => return data
        status: 'OK',
        message: 'Delete success',
      });
    } catch (error) {
      reject(error);
    }
  });
};

//[GET] /get-all
const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      Promise.all([User.find({}), User.countDocuments()])
        .then(([userAlls, totalUsers]) => {
          resolve({
            //OK? => return data
            status: 'OK',
            message: 'Get all users is success',
            totalUsers,
            data: userAlls,
          });
        })
        .catch((err) => {
          return res.status(404).json({
            status: 'ERR',
            message: 'Error',
          });
        });
    } catch (error) {
      reject(error);
    }
  });
};

//[GET] /get-detail/:id
const getDetailUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (user === null) {
        resolve({
          status: 'OK',
          message: 'User is not exist',
        });
      }
      resolve({
        //OK? => return data
        status: 'OK',
        message: 'Get user is success',
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  updateAvatar,
  changePassword,
  resetPassword,
  deleteUser,
  getAllUsers,
  getDetailUser,
};
