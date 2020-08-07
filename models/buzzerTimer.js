const mongoose = require('mongoose');

const BuzzerSchema = new mongoose.Schema({
  time: {
    type: Number,
    required: true
  },
  timeEnd: {
    type: Number,
    required: true
  }
});

const BuzzerTimer = mongoose.model('BuzzerTimer', BuzzerSchema);

module.exports = BuzzerTimer;