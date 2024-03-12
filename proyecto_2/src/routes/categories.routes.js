/* 
Create - Post
Read   - Get
Update - Put
Delete - Delete
*/

// http://localhost:PORT/api/categories
const { Router } = require('express');
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');

const router = Router();

/* 
TAREA!!!!
  Middlewares:
    - Validar JWT
    - Validar que el id sea un id de mongo
    - Validar que para crear, eliminar, modificar tenga rol de admin
*/
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
