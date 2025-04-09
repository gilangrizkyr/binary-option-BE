const User = require('../models/User');

exports.trade = async (req, res) => {
  try {
    const { amount, isDemo } = req.body;
    const user = await User.findById(req.user.id);

    const isWin = isDemo ? true : Math.random() < 0.7;

    if (isDemo) {
      user.demo_balance += isWin ? amount : -amount;
    } else {
      if (user.real_balance < amount) {
        return res.status(400).json({ message: 'Saldo tidak cukup' });
      }
      user.real_balance += isWin ? amount : -amount;
    }

    await user.save();
    res.json({ message: isWin ? 'Menang' : 'Kalah', user });
  } catch (err) {
    res.status(500).json({ message: 'Trade error', error: err.message });
  }
};