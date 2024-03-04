const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect('mongodb://localhost:27017/proyecto_01');
    console.log('Base de datos conectada');
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar a la base de datos');
  }
};

module.exports = {
  dbConnection,
};
