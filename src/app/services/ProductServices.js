const Product = require('../models/ProductModel');

//[POST] /create
const createProduct = (newUser) => {
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

//[PUT] /update-product/:id
const updateProduct = (userId, data) => {
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
        { data, password: hashPassword },
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

//[DELETE] /delete-product/:id
const deleteProduct = (userId) => {
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

//[GET] /get-all-products
const getAllProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // const userAlls = await User.find({});
      // const totalUsers = await User.countDocuments();
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

//[GET] /get-detail-product
const getDetailProduct = (userId) => {
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
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getDetailProduct,
};
