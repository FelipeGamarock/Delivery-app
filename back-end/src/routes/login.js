const express = require('express');

const controller = require('../controllers/login');


const genericMiddleware = require('../middlewares/generic');
const validateLogin = require('../middlewares/schema/handleLogin');
const validateRegister = require('../middlewares/schema/handleRegister');

const router = express.Router();

router.post('/login', genericMiddleware(validateLogin), controller.login);

router.post('/register', genericMiddleware(validateRegister), controller.register);

module.exports = router;
