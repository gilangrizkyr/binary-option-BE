const express = require('express');
const router = express.Router();
const User = require('../models/User'); // pastikan model User udah bener

// Endpoint untuk set mode
router.post('/set-mode', async (req, res) => {
  try {
    const { userId, mode } = req.body;

    if (!userId || !mode) {
      return res.status(400).json({ message: 'userId dan mode wajib diisi' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { mode },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.status(200).json({ message: 'Mode berhasil diupdate', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan di server' });
  }
});

module.exports = router;