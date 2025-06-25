const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.get('/api/ping', (req, res) => res.json({ message: 'Backend is working!' }));
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Cejoji backend with auth running on port ${PORT}`);
});