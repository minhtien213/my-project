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
  const userId = req.params.id;
  try {
    const token = req.headers['authorization'].split(' ')[1]; //['Bearer','token']
    const user = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (user && user.id === userId) {
      console.log(1);
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

module.exports = { authMiddleware, authUserMiddleware };
