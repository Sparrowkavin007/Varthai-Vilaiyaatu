const express = require('express');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', questionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
