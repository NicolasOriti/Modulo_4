/* 
Create - Post
Read   - Get
Update - Put
Delete - Delete
*/

// http://localhost:PORT/api/categories
const { Router } = require('express');
const { check } = require('express-validator');
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');

const { validateJWT } = require('../middlewares/validateJWT');
const { isAdminRole } = require('../middlewares/validateRole');
const { categoryExist } = require('../helpers/dbValidators');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

/* 
TAREA!!!!
  Middlewares:
    - Validar JWT
    - Validar que el id sea un id de mongo
    - Validar que para crear, eliminar, modificar tenga rol de admin
*/
router.get('/', [validateJWT], getAllCategories);

router.get(
  '/:id',
  [
    validateJWT,
    check('id', 'Is not valid id').isMongoId(),
    //validar si existe una categoría con ese id
    check('id').custom(categoryExist),
    validateFields,
  ],
  getCategory
);

router.post(
  '/',
  [
    validateJWT,
    isAdminRole,
    check('name', 'El nombre es obligatorio').notEmpty(),
    validateFields,
  ],
  createCategory
);

router.put(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Is not valid id').isMongoId(),
    //validar si existe una categoría con ese id,
    check('id').custom(categoryExist),
    check('name', 'Name is not empty').notEmpty().optional(),
    validateFields,
  ],
  updateCategory
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Is not valid id').isMongoId(),
    //validar si existe una categoría con ese id,
    check('id').custom(categoryExist),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
