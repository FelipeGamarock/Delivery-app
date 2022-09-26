const express = require('express');

const controller = require('../controllers/sale');

const router = express.Router();

router.get('/sale', controller.findAll);

router.post('/sale', controller.postSale);

router.get('/sale/:id', controller.findById);

router.patch('/sale/:id', controller.updateSale);

module.exports = router;