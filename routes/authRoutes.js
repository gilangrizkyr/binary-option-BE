// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');


// Endpoint Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', authController.getProfile);
router.post('/update-demo-balance', authController.updateDemoBalance);

module.exports = router;