const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demandSchema = new Schema({
  hotel: String,
  rooms: String,
  address: String,
  addressDetail: String,
  price: Number,
  gmtEnd: Number,
  gmtStart: Number,
  totalRooms: Number,
  totalPrice: Number,
  data: { type: Date, default: new Date().getTime() },
})

module.exports = mongoose.model('Demand', demandSchema);
