const express = require('express');

const controller = require('../controllers/user');
const validateToken = require('../middlewares/tokenJWT');

const router = express.Router();

router.get('/users', controller.findAll);

router.delete('/users/:id', validateToken, controller.delete);

router.post('/users', validateToken, controller.create);

module.exports = router;
