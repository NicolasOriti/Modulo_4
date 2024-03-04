// MongoExpressReactNode

// ES6 +
// import express from 'express';

// commonJS
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

// Conectar a la base de datos
dbConnection();

// Middleware --> Funciones que se ejecutan en el medio de la peticion.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Rutas --> Endpoints
app.use('/api/users', require('./routes/users.routes'));

app.listen(3000, () => {
  console.log(`Servidor encendido en http://localhost:3000`);
});
