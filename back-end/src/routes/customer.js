const express = require('express');

const controller = require('../controllers/customer');

const router = express.Router();

router.get('/customer/:id/orders', controller.findAll);

module.exports = router;
