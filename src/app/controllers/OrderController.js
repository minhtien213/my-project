const OrderServices = require('../services/OrderServices');
const Order = require('../models/OrderModel');

//[POST] /create-order/:id
const createOrder = async (req, res) => {
  const { listOrder, shippingInfo, discount, deliveryCharges, taxPrice, totalPrice } =
    req.body.data;
  try {
    if (
      !listOrder ||
      !shippingInfo ||
      discount === undefined ||
      deliveryCharges === undefined ||
      taxPrice === undefined ||
      totalPrice === undefined
    ) {
      return res.status(400).json({
        status: 'ERR',
        message: 'Dữ liệu đầu vào không hợp lệ.',
      });
    }
    const response = await OrderServices.createOrder(req.body.data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

//[PUT] /update-order/:id
const updateOrder = async (req, res) => {
  // console.log(req.body);
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
    const orderId = req.query.orderId;
    if (!orderId) {
      return res.status(404).json({
        status: 'ERR',
        message: 'Order ID không được rỗng',
      });
    }
    const response = await OrderServices.getDetailOrder(orderId);
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
