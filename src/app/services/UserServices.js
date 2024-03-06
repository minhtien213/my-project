const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const { createAccessToken, createRefreshToken } = require('./jwtServices');

//[POST] /sign-up
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, username, email, password, phone } = newUser;

    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser !== null) {
        resolve({
          status: 'OK',
          message: 'The email is already',
        });
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        username,
        email,
        password: hashPassword,
        phone,
      });
      if (createdUser) {
        resolve({
          status: 'OK',
          message: 'Success',
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
          status: 'OK',
          message: 'The user is not exist',
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        //check password is correct
        resolve({
          status: 'OK',
          message: 'The user or password is incorrect',
        });
      }
      const accessToken = await createAccessToken({
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
        accessToken,
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
          message: 'The user is not exist',
        });
      }
      const password = data.password;
      const hashPassword = bcrypt.hashSync(password, 10);
      const userUpdated = await User.findByIdAndUpdate(
        userId,
        { ...data, password: hashPassword },
        { new: true },
      );
      resolve({
        //OK? => return data
        status: 'OK',
        message: 'Success',
        data: userUpdated,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//[DELETE] /delete-user/:id
const deleteUser = (userId) => {
  // console.log(userId);
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

//[GET] /get-all-users
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

//[GET] /get-detail-user
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
  deleteUser,
  getAllUsers,
  getDetailUser,
};
