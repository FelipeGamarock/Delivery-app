const express = require('express');

const controller = require('../controllers/customer');

const router = express.Router();

const validateToken = require('../middlewares/tokenJWT');

router.get('/customer/orders', validateToken, controller.findAll);

module.exports = router;
