const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../middleware/validation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;