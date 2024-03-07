const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');

const validateJWT = async (req, res, next) => {
  // x-token
  // console.log({ authToken: req.header('Authorization'), xToken: req.header('x-token') });

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      message: 'Token is required',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('id:', uid);

    const user = await UserModel.findById(uid);

    if (!user) {
      return res.status(401).json({
        message: 'Token invalid or user not found',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        message: 'Token invalid or user inactive',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'Token invalid',
    });
  }
};

module.exports = {
  validateJWT,
};
