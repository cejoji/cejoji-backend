const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { destination, date, guests, notes } = req.body;
  try {
    const booking = new Booking({ userId: req.user.userId, destination, date, guests, notes });
    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router;