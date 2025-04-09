const express = require('express');
const router = express.Router();
const tradeController = require('../Controllers/tradeController');
const auth = require('../middleware/auth');

router.post('/', auth, tradeController.trade);

module.exports = router;