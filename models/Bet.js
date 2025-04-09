const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  direction: String, // up / down
  amount: Number,
  duration: Number,
  startTime: Date,
  endTime: Date,
  startPrice: Number,
  endPrice: Number,
  result: String, // win / lose
});

module.exports = mongoose.model('Bet', betSchema);