const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    // Conectar a la base de datos

    // TODO: utilizar variable de entorno
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Base de datos conectada');
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar a la base de datos');
  }
};

module.exports = {
  dbConnection,
};
