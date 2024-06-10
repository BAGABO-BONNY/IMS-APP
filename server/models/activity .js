const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  week: String,
  day: String,
  description: String,
  workingHours: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Activity', activitySchema);
