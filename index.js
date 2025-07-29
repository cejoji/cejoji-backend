const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Route modules
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const duffelRoutes = require('./routes/duffelRoutes'); // ✅ Add this line

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Test route
app.get('/api/ping', (req, res) => res.json({ message: 'Backend is working!' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', duffelRoutes); // Mount Duffel route under /api

app.listen(PORT, () => {
  console.log(`Cejoji backend running on port ${PORT}`);
});
