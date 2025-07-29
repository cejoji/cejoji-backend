// services/duffelService.js
const axios = require('axios');

const DUFFEL_API_KEY = process.env.DUFFEL_API_KEY;
const DUFFEL_API_URL = process.env.DUFFEL_API_URL || 'https://api.duffel.com';

const duffelClient = axios.create({
  baseURL: DUFFEL_API_URL,
  headers: {
    Authorization: `Bearer ${DUFFEL_API_KEY}`,
    'Duffel-Version': 'v1',
    'Content-Type': 'application/json',
  },
});

module.exports = duffelClient;
