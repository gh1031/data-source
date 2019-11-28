const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  password: String,
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Users', User)