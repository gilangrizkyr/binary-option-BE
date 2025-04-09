const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  direction: { type: String, enum: ["up", "down"], required: true },
  amount: { type: Number, required: true },
  entryPrice: { type: Number, required: true },
  exitPrice: { type: Number },
  result: { type: String, enum: ["win", "lose", "draw"] },
  timestamp: { type: Date, default: Date.now },
  duration: { type: Number, default: 60 } // dalam detik
});

module.exports = mongoose.model("Trade", tradeSchema);