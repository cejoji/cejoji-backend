// src/index.js (CommonJS)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 1) Create app FIRST
const app = express();

// 2) Allowed origins from ENV or default list
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || `
  http://localhost:5173,
  http://localhost:4173,
  http://localhost:5174,
  https://cejoji-frontend-base44.vercel.app,
  https://cejoji-frontend-prod.vercel.app
`)
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// 3) Trust proxy (important for cookies/sessions on Render/Heroku)
app.set('trust proxy', 1);

// 4) CORS config
const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (e.g. curl, Postman) or whitelisted origins
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight

// 5) Body parser
app.use(express.json());

// 6) Routes (each file must export a Router)
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const duffelRoutes = require('./routes/duffelRoutes');

// 7) DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// 8) Health check
app.get('/api/ping', (_req, res) => res.json({ message: 'Backend is working!' }));

// 9) Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', duffelRoutes); // or '/api/duffel'

// 10) 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// 11) Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

// 12) Start server (Render provides PORT)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Cejoji backend running on port ${PORT}`);
});

module.exports = app;
