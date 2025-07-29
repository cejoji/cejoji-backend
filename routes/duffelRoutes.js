// routes/duffelRoutes.js
const express = require('express');
const router = express.Router();
const duffelClient = require('../services/duffelService');

router.post('/search-flights', async (req, res) => {
  const { origin, destination, date } = req.body;

  if (!origin || !destination || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await duffelClient.post('/air/offer_requests', {
      slices: [
        {
          origin,
          destination,
          departure_date: date,
        },
      ],
      passengers: [{ type: 'adult' }],
      cabin_class: 'economy',
    });

    res.json(response.data);
  } catch (error) {
    console.error('Duffel API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Duffel flight search failed' });
  }
});

module.exports = router;
