const { Schema, model } = require('mongoose');

const TareaSchema = Schema({
  title: {
    type: String,
    required: true,
  },
});

// TareaSchema.methods.toJSON = function () {
//   const { __v, password, _id, ...user } = this.toObject();
//   user.uid = _id;
//   return user;
// };

module.exports = model('Tarea', TareaSchema);
