const ProductServices = require('../services/ProductServices');

//[POST] /create
const createProduct = async (req, res) => {
  const { name, type, brand, prices, quantity, rating, description, colors, memorys } = req.body;
  try {
    if (!name || !type || !brand || !quantity || !rating || !description) {
      return res.status(200).json({ status: 'ERR', message: 'Các trường không được để trống' });
    }
    const response = await ProductServices.createProduct(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

//[PUT] /update/:id
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const { name, images, type, price, quantity, rating, description } = req.body;
    const data = req.body;
    if (!name || !images || !type || !brand || !price || !quantity || !rating || !description) {
      return res.status(200).json({ status: 'ERR', message: 'The input is required' });
    }
    const response = await ProductServices.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

//[DELETE] /delete/:id
const deleteProduct = async (req, res) => {
  const productId = req.params.itemId;
  try {
    const response = await ProductServices.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

//[DELETE] /delete-many/:id/:listItemId
const deleteManyProducts = async (req, res) => {
  const listItemIds = req.params.listItemIds.split(',');
  try {
    const response = await ProductServices.deleteManyProducts(listItemIds);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

//[GET] /get-all
const getAllProducts = async (req, res) => {
  try {
    const { sort_field, sort_type, search_field, search, pageCurrent, pageSize } = req.query;
    const response = await ProductServices.getAllProducts(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[GET] /filter
const filterProducts = async (req, res) => {
  try {
    const { values, fields, pageSize, pageCurrent } = req.query;
    const response = await ProductServices.filterProducts(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[GET] /get-detail
const getDetailProduct = async (req, res) => {
  try {
    const productName = req.params.name;
    if (!productName) {
      return res.status(404).json({
        status: 'ERR',
        message: 'ProductId is required',
      });
    }
    const response = await ProductServices.getDetailProduct(productName);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
  getAllProducts,
  filterProducts,
  getDetailProduct,
};
