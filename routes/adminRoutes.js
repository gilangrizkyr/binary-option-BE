const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');

router.get('/dashboard', isAdmin, (req, res) => {
  res.json({ message: 'Welcome to admin dashboard' });
});

module.exports = router;