const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://cejoji.vercel.app' // Replace with your frontend URL
}));

app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.listen(PORT, () => {
  console.log(`Cejoji backend running on port ${PORT}`);
});