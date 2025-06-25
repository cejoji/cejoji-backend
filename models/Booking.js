const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destination: String,
  date: String,
  guests: Number,
  notes: String
}, { timestamps: true });
module.exports = mongoose.model('Booking', BookingSchema);