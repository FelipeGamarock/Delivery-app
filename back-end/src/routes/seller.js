const express = require('express');
const controller = require('../controllers/seller');
const authMiddleware = require('../middlewares/tokenJWT');

const router = express.Router();

router.get('/seller/orders', authMiddleware, controller.findAll);

module.exports = router;
