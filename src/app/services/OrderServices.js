const Order = require('../models/OrderModel');
const EmailServices = require('./EmailServices');

//[POST] /order/create-order/:id
const createOrder = (orderData) => {
  // console.log(orderData);
  return new Promise(async (resolve, reject) => {
    try {
      const createdOrder = await Order.create(orderData);
      if (createdOrder) {
        resolve({
          status: 'OK',
          message: 'Thêm đơn hàng thành công!',
          data: createdOrder,
        });
        EmailServices.sendEmailCreated(createdOrder);
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
const getMyOrders = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const myOrders = await Order.find({ userId: userId }).populate({
        path: 'listOrder.productId',
        model: 'Product',
      });
      if (myOrders === null) {
        resolve({
          status: 'ERR',
          message: 'Không có đơn hàng nào',
        });
      }
      resolve({
        status: 'OK',
        message: 'Lấy tất cả đơn hàng thành công',
        data: myOrders,
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
  getMyOrders,
};
