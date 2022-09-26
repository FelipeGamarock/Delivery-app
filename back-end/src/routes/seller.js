const express = require('express');
const controller = require('../controllers/seller');

const router = express.Router();

router.get('/seller/:id/orders', controller.findAll);

module.exports = router;
