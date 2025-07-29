const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Existing route modules
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

// ✅ New: Import Duffel route
const duffelRoutes = require('./routes/duffelRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Test route
app.get('/api/ping', (req, res) => res.json({ message: 'Backend is working!' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// ✅ New: Duffel search route
app.use('/api', duffelRoutes); // mounts /api/search-flights

// Start server
app.listen(PORT, () => {
  console.log(`Cejoji backend running on port ${PORT}`);
});
