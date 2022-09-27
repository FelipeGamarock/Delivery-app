const express = require('express');

const controller = require('../controllers/sale');
const validateToken = require('../middlewares/tokenJWT');

const router = express.Router();

router.get('/sale', controller.findAll);

router.post('/sale', validateToken, controller.postSale);

router.get('/sale/:id', controller.findById);

router.patch('/sale/:id', controller.updateSale);

module.exports = router;
