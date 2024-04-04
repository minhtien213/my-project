const Order = require('../models/OrderModel');
const { createAccessToken, createRefreshToken } = require('./jwtServices');

//[POST] /sign-up
const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password } = newOrder;

    try {
      const checkOrder = await Order.findOne({ email: email });
      if (checkOrder !== null) {
        resolve({
          status: 'ERR',
          message: 'Email đã tồn tại trong hệ thống',
        });
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const createdOrder = await Order.create({
        name,
        email,
        password: hashPassword,
      });
      if (createdOrder) {
        resolve({
          status: 'OK',
          message: 'Đăng kí thành công!',
          data: createdOrder,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//[PUT] /update-user/:id
const updateOrder = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findById(userId);
      if (checkOrder === null) {
        //check user is existing
        resolve({
          status: 'OK',
          message: 'Tài khoản không tồn tại',
        });
      }
      await Order.findByIdAndUpdate(userId, data);
      const userUpdated = await Order.findById(userId).populate({ path: 'cart.productId' });
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

//[DELETE] /delete-user/:id
const removeOrder = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findById(userId);
      if (checkOrder === null) {
        //check user is existing
        resolve({
          status: 'OK',
          message: 'The user is not exist',
        });
      }
      await Order.findByIdAndDelete({ _id: userId });
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
const getAllOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      Promise.all([Order.find({}), Order.countDocuments()])
        .then(([userAlls, totalOrders]) => {
          resolve({
            //OK? => return data
            status: 'OK',
            message: 'Get all users is success',
            totalOrders,
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
const getDetailOrder = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Order.findOne({ _id: userId }).populate({
        path: 'cart.productId',
        model: 'Product',
      });
      if (user === null) {
        resolve({
          status: 'OK',
          message: 'Order is not exist',
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
  createOrder,
  updateOrder,
  removeOrder,
  getAllOrders,
  getDetailOrder,
};
