const UserServices = require('../services/UserServices');
const User = require('../models/UserModel');

//[POST] /sign-up
const createUser = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body.data_register;
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isEmail = regexEmail.test(email);
    if (!name || !email || !password || !passwordConfirm) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Nhập thông tin để đăng kí',
      });
    } else if (!isEmail) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Email không đúng định dạng',
      });
    } else if (password !== passwordConfirm) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Mật khẩu không khớp',
      });
    }
    const response = await UserServices.createUser(req.body.data_register);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[POST] /sign-in
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isEmail = regexEmail.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Nhập thông tin để đăng nhập',
      });
    } else if (!isEmail) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Email không đúng định dạng',
      });
    }
    const response = await UserServices.loginUser(req.body);
    const { refreshToken, ...newResponse } = response;
    res.cookie('refreshToken', refreshToken, { HttpOnly: true, Secure: true });
    return res.status(200).json(newResponse);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[PUT] /update-user/:id
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const { name, email } = req.body;
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isEmail = regexEmail.test(email);
    if (!name || !email) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Tên và Email không được để trống',
      });
    } else if (!isEmail) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Email không đúng định dạng',
      });
    }
    if (!userId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required',
      });
    }
    const response = await UserServices.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[PUT] /update-avatar/:id
const updateAvatar = async (req, res) => {
  try {
    console.log(req.files);
    const userId = req.params.id;
    const file = req.files[0].path.replace(/\\/g, '/').replace('src/public', '..');
    const response = await UserServices.updateAvatar(userId, file);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[PUT] /change-password/:id
const changePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const { password, newPassword, passwordConfirm } = req.body;
    if (!newPassword || !password || !passwordConfirm) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Không được để trống',
      });
    } else if (newPassword !== passwordConfirm) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Mật khẩu không khớp',
      });
    }
    const response = await UserServices.changePassword(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[PUT] /reset-password
const resetPassword = async (req, res) => {
  try {
    const data = req.body;
    const { email, newPassword, passwordConfirm } = req.body;
    if (!email) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Nhập email để tìm kiếm tài khoản',
      });
    }
    const checkUser = await User.findOne({ email: email });
    if (checkUser === null) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Tài khoản không tồn tại',
      });
    }

    if (!email || !newPassword || !passwordConfirm) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Không được để trống',
      });
    } else if (newPassword !== passwordConfirm) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Mật khẩu không khớp',
      });
    }
    const response = await UserServices.resetPassword(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[DELETE] /delete-user/:id
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The userId is required',
      });
    }
    const response = await UserServices.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[GET] /get-all
const getAllUsers = async (req, res) => {
  try {
    const response = await UserServices.getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[GET] /get-detail/:id
const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).json({
        status: 'ERR',
        message: 'UserId is required',
      });
    }
    const response = await UserServices.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

//[PUT] /user/add-cart
const addCart = async (req, res) => {
  try {
    const { userId, ...data_add_cart } = req.body;
    const response = await UserServices.addCart(userId, data_add_cart);
    res.json(response);
  } catch (error) {
    console.error(error);
  }
};

//[DELETE] /user/remove-cart
const removeCartItem = async (req, res) => {
  try {
    const { userId, cartItemId } = req.body;
    const response = await UserServices.removeCartItem(userId, cartItemId);
    res.json(response);
  } catch (error) {
    console.error(error);
  }
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
  addCart,
  removeCartItem,
};
