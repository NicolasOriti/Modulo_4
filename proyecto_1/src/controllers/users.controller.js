const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

const getUsers = async (req, res) => {
  const { limit, offset } = req.query;
  const query = { isActive: true };

  const allUsers = await UserModel.find(query).skip(offset).limit(limit);

  res.json({
    message: 'Get All users',
    results: allUsers,
  });
};

const createUser = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);

    const salt = bcrypt.genSaltSync(10);

    const user = new UserModel(body);

    const hash = bcrypt.hashSync(body.password, salt);
    user.password = hash;

    await user.save();

    res.statusCode = 201;
    res.json({
      message: 'Usuario creado exitosamente',
      result: user,
    });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      message: 'INTERNAL SERVER ERROR',
      error: error.message,
    });
  }
};

const updateUser = (req, res) => {
  res.json({
    message: 'PUT',
  });
};

const deleteUser = (req, res) => {
  res.json({
    message: 'DELETE',
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
