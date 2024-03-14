const UserModel = require('../models/user');
const CategoryModel = require('../models/Category');
const { ROLES } = require('../constants');

const emailExist = async (email) => {
  const user = await UserModel.findOne({ email });

  if (user) {
    console.log(user.email);
    throw new Error(`The email ${email} is already in use`);
  }
};

const categoryExist = async (id) => {
  const existeCategoria = await CategoryModel.findById(id);

  if (!existeCategoria) {
    throw new Error(`Id ${id} is not found`);
  }
};

const isValidRole = (role) => {
  if (!ROLES.includes(role)) {
    throw new Error(`The role ${role} is not valid`);
  }
};

module.exports = {
  emailExist,
  categoryExist,
  isValidRole,
};
