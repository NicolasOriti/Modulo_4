const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validateFields } = require('../helpers/validateFields');

const router = Router();

// http://localhost:3000/api/users
router.get('/', getUsers);
router.post(
  '/',
  [
    check('name').notEmpty(),
    check('password', 'Password need 6 chars').isLength({ min: 6 }),
    check('email').isEmail(),
    validateFields,
  ],
  createUser
);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;
