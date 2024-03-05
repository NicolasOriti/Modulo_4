const express = require('express');

const { dbConnection } = require('./database/config');
const TareaModel = require('./models/Tarea');

const app = express();

dbConnection();

app.use(express.json());

app.get('/', async (req, res) => {
  const tareas = await TareaModel.find();
  res.json({ tareas });
});

app.get('/:id');

app.post('/', async (req, res) => {
  const { title } = req.body;

  const newTarea = new TareaModel({ title });
  newTarea.save();

  res.json({
    newTarea,
  });
});

app.put('/:id');

app.delete('/:id');

app.listen(3000, () => {
  console.log('Servicio online: http://localhost:3000');
});
