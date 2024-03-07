const Product = require('../models/ProductModel');

//[POST] /create
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name } = newProduct;
    try {
      const checkProduct = await Product.findOne({ name: name });
      if (checkProduct !== null) {
        resolve({
          status: 'OK',
          message: 'The name is already',
        });
      }
      const createdProduct = await Product.create(newProduct);
      if (createdProduct) {
        resolve({
          status: 'OK',
          message: 'Success',
          data: createdProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//[PUT] /update/:id
const updateProduct = (productId, data) => {
  console.log(productId);
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findById(productId);
      if (checkProduct === null) {
        //check product is existing
        resolve({
          status: 'OK',
          message: 'The product is not exist',
        });
      }
      const productUpdated = await Product.findByIdAndUpdate(productId, data, { new: true });
      resolve({
        //OK? => return data
        status: 'OK',
        message: 'Success',
        data: productUpdated,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//[DELETE] /delete/:id
const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findById(productId);
      if (checkProduct === null) {
        //check product is existing
        resolve({
          status: 'OK',
          message: 'The product is not exist',
        });
      }
      await Product.findByIdAndDelete({ _id: productId });
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

//[DELETE] /delete-many
const deleteManyProduct = (productIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.find({ _id: productIds });
      console.log(checkProduct);
      if (checkProduct.length === 0) {
        //check product is existing
        resolve({
          status: 'OK',
          message: 'The product is not exist',
        });
      }
      await Product.deleteMany({ _id: { $in: productIds } });
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

//[GET] /get-all-products
const getAllProducts = (queryData) => {
  const { sort_field = 'name', sort_type = 'asc', search_field, search, page = 1 } = queryData;
  const pageSize = 3;

  // Tìm kiếm không phân biệt chữ hoa/chữ thường với $regex và tùy chọn 'i'
  const regex = new RegExp(search, 'i');

  return new Promise(async (resolve, reject) => {
    try {
      if (search_field && search) {
        Promise.all([
          Product.find({ [search_field]: { $regex: regex } })
            .sort({ [sort_field]: ['asc', 'desc'].includes(sort_type) ? sort_type : 'desc' })
            .skip((page - 1) * pageSize)
            .limit(pageSize),
          Product.countDocuments({ [search_field]: { $regex: regex } }),
        ])
          .then(([productAlls, totalProducts]) => {
            resolve({
              //OK? => return data
              status: 'OK',
              message: 'Get products is success',
              totalProducts,
              totalPages: Math.ceil(totalProducts / pageSize),
              data: productAlls,
            });
          })
          .catch((err) => {
            return res.status(404).json({
              status: 'ERR',
              message: 'Error',
            });
          });
      } else {
        Promise.all([
          Product.find({})
            .sort({ [sort_field]: ['asc', 'desc'].includes(sort_type) ? sort_type : 'desc' })
            .skip((page - 1) * pageSize)
            .limit(pageSize),
          Product.countDocuments({}),
        ])
          .then(([productAlls, totalProducts]) => {
            resolve({
              //OK? => return data
              status: 'OK',
              message: 'Get products is success',
              totalProducts,
              totalPages: Math.ceil(totalProducts / pageSize),
              data: productAlls,
            });
          })
          .catch((err) => {
            return res.status(404).json({
              status: 'ERR',
              message: 'Error',
            });
          });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//[GET] /get-detail
const getDetailProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ _id: productId });
      if (product === null) {
        resolve({
          status: 'OK',
          message: 'Product is not exist',
        });
      }
      resolve({
        //OK? => return data
        status: 'OK',
        message: 'Get product is success',
        data: product,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProduct,
  getAllProducts,
  getDetailProduct,
};
