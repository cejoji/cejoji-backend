const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bookingsRoutes = require('./routes/bookings');
const profileRoutes = require('./routes/profile');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
const duffelRoutes = require('./routes/duffelRoutes');
app.use('/', duffelRoutes);


app.get('/api/ping', (req, res) => {
  res.send('Backend is working!');
});

// Connect to DB & Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.log(err));

// Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
