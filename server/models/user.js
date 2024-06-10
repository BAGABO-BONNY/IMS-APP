const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
