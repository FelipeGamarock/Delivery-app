const express = require('express');
const controller = require('../controllers/customer');

const router = express.Router();

router.get('/customer/products', controller.products);

module.exports = router;
