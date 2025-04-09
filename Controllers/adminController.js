const User = require('../models/User');
const Trade = require('../models/TradeModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateUserBalance = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.balance = req.body.balance;
    await user.save();

    res.json({ msg: 'Balance updated', balance: user.balance });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find().populate('user', 'username email');
    res.json(trades);
  } catch (err) {
    res.status(500).send('Server error');
  }
};