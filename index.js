// src/index.js (CommonJS)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 1) Create app FIRST
const app = express();

// 2) CORS config (use only once)
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:5174',
    'https://cejoji-frontend-base44.vercel.app',
    'https://cejoji-frontend-prod.vercel.app',
  ],
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
};
app.use(cors(corsOptions));

// 3) Body parser
app.use(express.json());

// 4) Routes (each file must export a Router)
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const duffelRoutes = require('./routes/duffelRoutes');

// 5) DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// 6) Health check
app.get('/api/ping', (_req, res) => res.json({ message: 'Backend is working!' }));

// 7) Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', duffelRoutes); // or '/api/duffel'

// 8) Start server (Render provides PORT)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Cejoji backend running on port ${PORT}`);
});

module.exports = app;
