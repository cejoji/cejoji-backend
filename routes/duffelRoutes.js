// routes/duffelRoutes.js
const express = require('express');
const router = express.Router();
const duffelClient = require('../services/duffelService');

router.post('/search-flights', async (req, res) => {
  try {
    const response = await duffelClient.post('/air/offer_requests', {
      slices: [
        {
          origin: req.body.origin,
          destination: req.body.destination,
          departure_date: req.body.date,
        },
      ],
      passengers: [{ type: 'adult' }],
      cabin_class: 'economy',
    });

    res.json(response.data);
  } catch (error) {
    console.error('Duffel API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Flight search failed' });
  }
});

module.exports = router;
