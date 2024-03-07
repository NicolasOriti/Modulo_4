const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { emailExist, isValidRole } = require('../helpers/dbValidators');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { isAdminRole } = require('../middlewares/validateRole');

const router = Router();

// http://localhost:3000/api/users
router.get('/', [validateJWT, isAdminRole], getUsers);
router.post(
  '/',
  [
    check('name').notEmpty(),
    check('password', 'Password need 6 chars').isLength({ min: 6 }),
    check('email', 'Please enter a valid email').isEmail(),
    check('email').custom(emailExist),
    // check('role').custom(isValidRole),
    validateFields,
  ],
  createUser
);

// http://localhost:3000/api/users/:id {id}
router.put('/:id', [check('id', 'Is not valid ID').isMongoId(), validateFields], updateUser);
router.delete('/:id', [check('id', 'Is not valid ID').isMongoId(), validateFields], deleteUser);

module.exports = router;
