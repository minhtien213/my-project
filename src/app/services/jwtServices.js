const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createAccessToken = async (payload) => {
  const accessToken = jwt.sign({ payload }, process.env.ACCESS_TOKEN, {
    expiresIn: '1h',
  });
  return accessToken;
};

const createRefreshToken = async (payload) => {
  const refreshToken = jwt.sign({ payload }, process.env.REFRESH_TOKEN, {
    expiresIn: '365d',
  });
  return refreshToken;
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
