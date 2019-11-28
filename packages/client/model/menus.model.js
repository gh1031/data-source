const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menusSchema = new Schema({
  title: String,
  path: String,
  icon: String,
  children: Array,
  date: { type: Date, default: new Date().getTime() }
})

module.exports = mongoose.model('Menus', menusSchema)