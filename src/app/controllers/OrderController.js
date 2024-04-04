const OrderServices = require('../services/OrderServices');
const Order = require('../models/OrderModel');

//[POST] /create/:id
const createOrder = async (req, res) => {
  console.log(req.body);
  // try {
  //   const { name, email, password, passwordConfirm } = req.body.data_register;
  //   if (!name || !email || !password || !passwordConfirm) {
  //     return res.status(200).json({
  //       status: 'ERR',
  //       message: 'Nhập thông tin để đăng kí',
  //     });
  //   }
  //   const response = await OrderServices.createOrder(req.body);
  //   return res.status(200).json(response);
  // } catch (error) {
  //   return res.status(404).json({
  //     message: error,
  //   });
  // }
};

//[PUT] /update-order/:id
const updateOrder = async (req, res) => {
  console.log(req.body);
  // try {
  //   const userId = req.params.id;
  //   const data = req.body;
  //   const { name, email } = req.body;
  //   const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  //   const isEmail = regexEmail.test(email);
  //   if (!name || !email) {
  //     return res.status(200).json({
  //       status: 'ERR',
  //       message: 'Tên và Email không được để trống',
  //     });
  //   } else if (!isEmail) {
  //     return res.status(200).json({
  //       status: 'ERR',
  //       message: 'Email không đúng định dạng',
  //     });
  //   }
  //   if (!userId) {
  //     return res.status(200).json({
  //       status: 'ERR',
  //       message: 'The userId is required',
  //     });
  //   }
  //   const response = await OrderServices.updateOrder(userId, data);
  //   return res.status(200).json(response);
  // } catch (error) {
  //   return res.status(404).json({
  //     message: error,
  //   });
  // }
};

//[DELETE] /remove-order/:id
const removeOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required',
      });
    }
    const response = await OrderServices.deleteOrder(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[GET] /get-all
const getAllOrders = async (req, res) => {
  try {
    const response = await OrderServices.getAllOrders();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[GET] /get-detail/:id
const getDetailOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).json({
        status: 'ERR',
        message: 'OrderId is required',
      });
    }
    const response = await OrderServices.getDetailOrder(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  removeOrder,
  getAllOrders,
  getDetailOrder,
};
