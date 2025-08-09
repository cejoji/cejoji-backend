const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const corsOptions = {
  origin: [
    'http://localhost:5173','http://localhost:4173', 'http://localhost:5174',
    'https://cejoji-frontend-base44.vercel.app',
    'https://cejoji-frontend-prod.vercel.app' // ✅ ADD THIS
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// Route modules
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const duffelRoutes = require('./routes/duffelRoutes'); // ✅ Add this line

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

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
