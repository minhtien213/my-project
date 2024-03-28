const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//check admin
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]; //['Bearer','token']
    const user = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (user && user.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        status: 'ERROR',
        message: 'The user is not authorized',
      });
    }
  } catch (error) {
    return res.redirect('/sign-in');
  }
};

//check user
const authUserMiddleware = (req, res, next) => {
  try {
    const userId = req.params.id;
    const token = req.headers['authorization'].split(' ')[1]; //['Bearer','token']
    if (!token || !userId) {
      return res.status(401).json({
        status: 'ERROR',
        message: 'Token or user ID is missing',
      });
    } else {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN);
      if (user && (user.isAdmin || user.id === userId)) {
        next();
      } else {
        return res.status(404).json({
          status: 'ERROR',
          message: 'The user is not authorized',
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Token is invalid',
    });
  }
};

module.exports = { authMiddleware, authUserMiddleware };
