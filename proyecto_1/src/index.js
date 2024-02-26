// MongoExpressReactNode

// ES6 +
// import express from 'express';

// commonJS
const express = require('express');
const morgan = require('morgan');

// console.log(express);

const app = express();

// Middleware --> Funciones que se ejecutan en el medio de la peticion.

app.use(express.json());
app.use(morgan('tiny'));

app.get('/api', (req, res) => {
  console.log('Hola mundo desde una peticion GET');
  res.send('Hola cliente');
});

app.post('/api/users', (req, res) => {
  const { body } = req;

  body.password = '******';
  res.statusCode = 201;
  res.json({
    message: 'Usuario creado exitosamente',
    result: body,
  });
});

app.put('/api/users', (req, res) => {
  res.json({
    message: 'PUT',
  });
});

app.delete('/api/users', (req, res) => {
  res.json({
    message: 'DELETE',
  });
});

app.listen(3000, () => {
  console.log(`Servidor encendido en http://localhost:3000`);
});
