const UserModel = require('../models/user');
const { ROLES } = require('../constants');

const emailExist = async (email) => {
  const user = await UserModel.findOne({ email });
  console.log('USER: ', user);
  if (user) {
    console.log(user.email);
    throw new Error(`The email ${email} is already in use`);
  }
};

const isValidRole = (role) => {
  if (!ROLES.includes(role)) {
    throw new Error(`The role ${role} is not valid`);
  }
};

module.exports = {
  emailExist,
  isValidRole,
};
