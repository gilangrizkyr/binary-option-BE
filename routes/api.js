const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bet = require('../models/Bet');

// LOGIN/REGISTER
router.post('/login', async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    user = await User.create({ username: req.body.username, password: req.body.password });
  }
  res.json({ id: user._id, balance: user.balance });
});

// PASANG TARUHAN
router.post('/bet', async (req, res) => {
  const { userId, direction, amount, duration } = req.body;
  const user = await User.findById(userId);
  if (!user || user.balance < amount) return res.status(400).send('Saldo kurang');

  const startPrice = global.currentPrice;
  const endTime = new Date(Date.now() + duration * 1000);

  const bet = await Bet.create({
    userId, direction, amount, duration,
    startTime: new Date(), endTime, startPrice,
  });

  user.balance -= amount;
  await user.save();

  // Cek hasil setelah durasi selesai
  setTimeout(async () => {
    const endPrice = global.currentPrice;
    const win = (direction === 'up' && endPrice > startPrice) || (direction === 'down' && endPrice < startPrice);

    bet.endPrice = endPrice;
    bet.result = win ? 'win' : 'lose';
    await bet.save();

    if (win) {
      user.balance += amount * 2;
      await user.save();
    }
  }, duration * 1000);

  res.json({ msg: 'Bet placed' });
});

// GET HISTORY
router.get('/history/:userId', async (req, res) => {
  const bets = await Bet.find({ userId: req.params.userId }).sort({ startTime: -1 }).limit(20);
  res.json(bets);
});

module.exports = router;