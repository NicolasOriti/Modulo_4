const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: 'USER',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('User', UserSchema);
