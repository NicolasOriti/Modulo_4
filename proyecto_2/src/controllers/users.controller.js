const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

const getUsers = async (req, res) => {
  const { limit, offset, role } = req.query;
  const query = { isActive: true };

  if (role) query.role = role;

  // const allUsers = await UserModel.find(query).skip(offset).limit(limit);
  // const total = await UserModel.countDocuments(query);
  const [results, total] = await Promise.all([
    UserModel.find(query).skip(offset).limit(limit),
    UserModel.countDocuments(query),
  ]);

  res.json({
    message: 'Get All users',
    results,
    total,
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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, email, ...restBody } = req.body;

    console.log(restBody);

    const userUpdated = await UserModel.findByIdAndUpdate(id, restBody, { new: true });
    res.json({
      message: 'User updated successfully',
      user: userUpdated,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error(`User with ID: ${id} not found`);
    }

    if (!user.isActive) {
      throw new Error(`User with ID: ${id} is inactive`);
    }

    const deletedUser = await UserModel.findByIdAndUpdate(id, { isActive: false }, { new: true });

    res.json({
      message: 'Delete user successfully',
      deletedUser,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
