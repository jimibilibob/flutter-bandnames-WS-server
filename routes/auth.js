/**
 * path: /api/login
 */


const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, refreshToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new', [
  check('name', 'Name field is required').not().isEmpty(),
  // check('email', 'Email field is required').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password field is required').not().isEmpty(),
  validateFields
], createUser);

router.post('/', [
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password field is required').not().isEmpty(),
  validateFields
], login);

// validar JWT
router.get('/refresh', validateJWT, refreshToken);


module.exports = router;