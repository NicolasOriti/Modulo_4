const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validateJWT');
const { isAdminRole } = require('../middlewares/validateRole');
const { categoryExist } = require('../helpers/dbValidators');
const { validateFields } = require('../middlewares/validateFields');
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses.controller');

const router = Router();

router.get('/', [validateJWT], getAllCourses);

router.get(
  '/:id',
  [
    validateJWT,
    check('id', 'Is not valid id').isMongoId(),
    //validar si existe una categoría con ese id
    validateFields,
  ],
  getCourse
);

router.post(
  '/',
  [validateJWT, isAdminRole, check('name', 'El nombre es obligatorio').notEmpty(), validateFields],
  createCourse
);

router.put(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Is not valid id').isMongoId(),
    //validar si existe una categoría con ese id,
    check('name', 'Name is not empty').notEmpty().optional(),
    validateFields,
  ],
  updateCourse
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Is not valid id').isMongoId(),
    //validar si existe una categoría con ese id,
    validateFields,
  ],
  deleteCourse
);

module.exports = router;
