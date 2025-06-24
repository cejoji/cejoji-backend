const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Open CORS for all origins (for testing)
app.use(cors());

app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.listen(PORT, () => {
  console.log(`Cejoji backend running on port ${PORT}`);
});